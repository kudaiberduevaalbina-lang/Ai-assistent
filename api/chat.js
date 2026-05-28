module.exports = async function handler(req, res) {
    // CORS headers (for local development)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({
            error: 'API ключ не настроен на сервере. Укажите GEMINI_API_KEY в переменных окружения Vercel.'
        });
    }

    const {
        contents,
        systemInstruction,
        temperature = 0.7,
        maxOutputTokens = 2000
    } = req.body;

    try {
        if (apiKey.startsWith('sk-')) {
            // ── OpenAI Path ──
            const messages = [];
            if (systemInstruction) {
                messages.push({ role: 'system', content: systemInstruction });
            }

            for (const msg of contents) {
                const role = msg.role === 'model' ? 'assistant' : 'user';
                let content = '';

                const textPart = msg.parts?.find(p => p.text);
                const imgPart = msg.parts?.find(p => p.inlineData);

                if (imgPart) {
                    content = [];
                    if (textPart) {
                        content.push({ type: 'text', text: textPart.text });
                    }
                    content.push({
                        type: 'image_url',
                        image_url: {
                            url: `data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}`
                        }
                    });
                } else if (textPart) {
                    content = textPart.text;
                }

                messages.push({ role, content });
            }

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages,
                    temperature,
                    max_tokens: maxOutputTokens
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || 'OpenAI API error');
            }

            const data = await response.json();
            if (data.choices?.[0]?.message) {
                return res.status(200).json({ text: data.choices[0].message.content });
            }
            throw new Error('Empty response from OpenAI');

        } else {
            // ── Gemini Path ──
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

            const requestBody = {
                contents,
                generationConfig: { temperature, maxOutputTokens }
            };

            if (systemInstruction) {
                requestBody.systemInstruction = {
                    parts: [{ text: systemInstruction }]
                };
            }

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || 'Gemini API error');
            }

            const data = await response.json();
            if (data.candidates?.[0]?.content) {
                return res.status(200).json({ text: data.candidates[0].content.parts[0].text });
            }
            throw new Error('Empty response from Gemini API');
        }
    } catch (error) {
        console.error('API Proxy Error:', error);
        return res.status(500).json({ error: error.message });
    }
};
