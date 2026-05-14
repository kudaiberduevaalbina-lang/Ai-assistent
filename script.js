document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings');
    const saveSettingsBtn = document.getElementById('save-settings');
    const apiKeyInput = document.getElementById('api-key');
    const apiStatus = document.getElementById('api-status');
    const newChatBtn = document.getElementById('new-chat-btn');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    const attachBtn = document.getElementById('attach-btn');
    const fileInput = document.getElementById('file-input');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const removeImageBtn = document.getElementById('remove-image-btn');
    const micBtn = document.getElementById('mic-btn');
    const chatStyle = document.getElementById('chat-style');
    
    // State
    let apiKey = (typeof GEMINI_API_KEY !== 'undefined' && GEMINI_API_KEY !== "YOUR_API_KEY_HERE") 
        ? GEMINI_API_KEY 
        : (localStorage.getItem('gemini_api_key') || '');
    let chatHistory = [];
    let currentImageBase64 = null;
    let currentImageMimeType = null;
    let isRecording = false;

    // Initialize API Status
    updateApiStatus();

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        checkInputState();
    });

    function checkInputState() {
        if(chatInput.value.trim() === '' && !currentImageBase64) {
            sendBtn.disabled = true;
        } else {
            sendBtn.disabled = false;
        }
    }

    // Handle Enter key (Shift+Enter for new line)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Send button click
    sendBtn.addEventListener('click', sendMessage);

    // Settings Modal
    settingsBtn.addEventListener('click', () => {
        apiKeyInput.value = apiKey;
        settingsModal.classList.add('active');
    });

    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });

    saveSettingsBtn.addEventListener('click', () => {
        apiKey = apiKeyInput.value.trim();
        localStorage.setItem('gemini_api_key', apiKey);
        updateApiStatus();
        settingsModal.classList.remove('active');
        
        if (apiKey) {
            addBotMessage("Отлично! API ключ сохранен. Теперь вы можете задавать мне любые вопросы.");
        }
    });

    // Close modal on outside click
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });

    // New Chat
    newChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="message-content">
                    <p>Новый чат начат. Чем могу помочь?</p>
                </div>
            </div>
        `;
        chatHistory = [];
    });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // --- Image Upload Logic ---
    attachBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // event.target.result is like data:image/jpeg;base64,/9j/4AAQSkZJRg...
                const dataUrl = event.target.result;
                currentImageMimeType = dataUrl.substring(dataUrl.indexOf(':') + 1, dataUrl.indexOf(';'));
                currentImageBase64 = dataUrl.substring(dataUrl.indexOf(',') + 1);
                
                imagePreview.src = dataUrl;
                imagePreviewContainer.style.display = 'inline-block';
                checkInputState();
            };
            reader.readAsDataURL(file);
        }
    });

    removeImageBtn.addEventListener('click', () => {
        clearImage();
        checkInputState();
    });

    function clearImage() {
        currentImageBase64 = null;
        currentImageMimeType = null;
        fileInput.value = '';
        imagePreviewContainer.style.display = 'none';
        imagePreview.src = '';
    }

    // --- Voice Input (Speech Recognition) ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'ru-RU';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = function() {
            isRecording = true;
            micBtn.classList.add('recording');
        };

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            chatInput.value += (chatInput.value ? ' ' : '') + transcript;
            checkInputState();
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error', event.error);
            isRecording = false;
            micBtn.classList.remove('recording');
        };

        recognition.onend = function() {
            isRecording = false;
            micBtn.classList.remove('recording');
        };

        micBtn.addEventListener('click', () => {
            if (isRecording) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    } else {
        micBtn.style.display = 'none';
    }

    function updateApiStatus() {
        if (apiKey) {
            apiStatus.className = 'status-indicator success';
            apiStatus.title = 'API ключ установлен';
        } else {
            apiStatus.className = 'status-indicator warning';
            apiStatus.title = 'API ключ не установлен';
        }
    }

    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text && !currentImageBase64) return;

        const imgB64 = currentImageBase64;
        const imgMime = currentImageMimeType;

        // Reset input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        sendBtn.disabled = true;
        clearImage();

        // Add user message to UI
        addUserMessage(text, imgB64, imgMime);
        
        // Construct part for history
        const parts = [];
        if (text) {
            parts.push({ text: text });
        }
        if (imgB64) {
            parts.push({
                inlineData: {
                    mimeType: imgMime,
                    data: imgB64
                }
            });
        }
        
        chatHistory.push({ role: "user", parts: parts });

        if (!apiKey) {
            setTimeout(() => {
                addBotMessage("Пожалуйста, установите API ключ Gemini в настройках для получения ответов.", true);
            }, 500);
            return;
        }

        const typingId = showTypingIndicator();

        try {
            const responseText = await callGeminiAPI(chatHistory);
            removeMessage(typingId);
            addBotMessage(responseText);
            chatHistory.push({ role: "model", parts: [{ text: responseText }] });
        } catch (error) {
            removeMessage(typingId);
            addBotMessage(`Произошла ошибка: ${error.message}. Проверьте правильность API ключа или подключение к интернету.`, true);
        }
    }

    function addUserMessage(text, imgB64, imgMime) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user-message';
        
        let contentHtml = '';
        if (imgB64) {
            contentHtml += `<img src="data:${imgMime};base64,${imgB64}" class="message-image" alt="User upload">`;
        }
        if (text) {
            contentHtml += `<p>${escapeHTML(text)}</p>`;
        }

        msgDiv.innerHTML = `
            <div class="message-avatar"><i class="fa-solid fa-user"></i></div>
            <div class="message-content">
                ${contentHtml}
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function addBotMessage(text, isError = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        
        // Markdown parsing for bold, code blocks, lists
        let formattedText = escapeHTML(text)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\`\`\`([\s\S]*?)\`\`\`/g, '<pre><code>$1</code></pre>')
            .replace(/\`([^`]+)\`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');

        // Create action buttons (Listen, Copy)
        const actionsHtml = isError ? '' : `
            <div class="message-actions">
                <button class="action-btn listen-btn" title="Прослушать"><i class="fa-solid fa-volume-high"></i></button>
                <button class="action-btn copy-btn" title="Копировать"><i class="fa-regular fa-copy"></i></button>
            </div>
        `;

        msgDiv.innerHTML = `
            <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="message-content" ${isError ? 'style="color: var(--danger)"' : ''}>
                <p>${formattedText}</p>
                ${actionsHtml}
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();

        if (!isError) {
            const listenBtn = msgDiv.querySelector('.listen-btn');
            const copyBtn = msgDiv.querySelector('.copy-btn');

            listenBtn.addEventListener('click', () => {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'ru-RU';
                window.speechSynthesis.speak(utterance);
            });

            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(text).then(() => {
                    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                    }, 2000);
                });
            });
        }
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.id = id;
        msgDiv.className = 'message bot-message';
        msgDiv.innerHTML = `
            <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeMessage(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Call Gemini API
    async function callGeminiAPI(history) {
        // We use flash model which supports both text and images
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        
        // Only sending the last 10 messages for context to avoid huge payloads
        const recentHistory = history.slice(-10);

        let systemInstructionText = "";
        const styleValue = chatStyle ? chatStyle.value : "normal";
        if (styleValue === "respectful") {
            systemInstructionText = "Твоя задача — общаться крайне уважительно, обращаться к собеседнику строго на 'Вы' и использовать вежливые формулировки, как при разговоре со старшим по возрасту или статусу.";
        } else if (styleValue === "friendly") {
            systemInstructionText = "Твоя задача — общаться максимально дружелюбно, расслабленно, на 'ты', как с близким другом или с младшим. Можно использовать легкий сленг.";
        }

        const requestBody = {
            contents: recentHistory,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2000,
            }
        };

        if (systemInstructionText) {
            requestBody.systemInstruction = {
                parts: [{ text: systemInstructionText }]
            };
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || 'Ошибка сети');
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Пустой ответ от API');
        }
    }
});
