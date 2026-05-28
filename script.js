document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        'ru-RU': {
            newChat: 'Новый чат', chatStyle: 'Стиль общения:', styleNormal: 'Обычный', styleRespectful: 'К старшим (уважительно)', styleFriendly: 'К младшим (на ты)', language: 'Язык:', settings: 'Настройки API', aiAssistant: 'AI Ассистент', welcome1: 'Привет! Я умный AI ассистент. Я могу ответить на любые ваши вопросы.', welcome2: 'Для начала работы мне нужен API ключ. Нажмите на "Настройки API" и введите ключ.', inputPlaceholder: 'Введите ваш вопрос здесь...', disclaimer: 'AI может ошибаться. Проверяйте информацию.', settingsTitle: 'Настройки API', settingsDesc: 'Для работы необходим API ключ Google Gemini или OpenAI.', apiKeyLabel: 'API Key', customPromptLabel: 'Кастомная роль бота (System Prompt)', customPromptPlaceholder: 'Например: Ты опытный программист...', getKey: 'Получить бесплатный ключ здесь', saveBtn: 'Сохранить', currentChat: 'Текущий разговор'
        },
        'en-US': {
            newChat: 'New chat', chatStyle: 'Chat style:', styleNormal: 'Normal', styleRespectful: 'Respectful', styleFriendly: 'Friendly', language: 'Language:', settings: 'API Settings', aiAssistant: 'AI Assistant', welcome1: 'Hello! I am a smart AI assistant. I can answer any of your questions.', welcome2: 'To get started, I need an API key. Click on "API Settings" and enter your key.', inputPlaceholder: 'Enter your question here...', disclaimer: 'AI can make mistakes. Verify important info.', settingsTitle: 'API Settings', settingsDesc: 'An API key from Google Gemini or OpenAI is required.', apiKeyLabel: 'API Key', customPromptLabel: 'Custom Bot Role (System Prompt)', customPromptPlaceholder: 'Example: You are an expert programmer...', getKey: 'Get a free key here', saveBtn: 'Save', currentChat: 'Current conversation'
        },
        'es-ES': {
            newChat: 'Nuevo chat', chatStyle: 'Estilo:', styleNormal: 'Normal', styleRespectful: 'Respetuoso', styleFriendly: 'Amigable', language: 'Idioma:', settings: 'Ajustes API', aiAssistant: 'Asistente IA', welcome1: '¡Hola! Soy un asistente inteligente. Puedo responder tus preguntas.', welcome2: 'Necesito una clave API. Haz clic en "Ajustes API" y añade tu clave.', inputPlaceholder: 'Escribe tu pregunta aquí...', disclaimer: 'La IA puede equivocarse. Verifica la info.', settingsTitle: 'Ajustes API', settingsDesc: 'Se requiere una clave API de Gemini u OpenAI.', apiKeyLabel: 'Clave API', customPromptLabel: 'Rol Personalizado', customPromptPlaceholder: 'Ejemplo: Eres un experto programador...', getKey: 'Consigue una clave gratis', saveBtn: 'Guardar', currentChat: 'Conversación actual'
        },
        'zh-CN': {
            newChat: '新聊天', chatStyle: '聊天风格:', styleNormal: '正常', styleRespectful: '尊重', styleFriendly: '友好', language: '语言:', settings: 'API 设置', aiAssistant: 'AI 助手', welcome1: '你好！我是一个聪明的 AI 助手。', welcome2: '我需要一个 API 密钥。点击“API 设置”并输入。', inputPlaceholder: '在这里输入您的问题...', disclaimer: 'AI 可能会犯错。', settingsTitle: 'API 设置', settingsDesc: '需要 Google Gemini 或 OpenAI 的 API 密钥。', apiKeyLabel: 'API 密钥', customPromptLabel: '自定义角色', customPromptPlaceholder: 'например: ты опытный программист...', getKey: '获取免费密钥', saveBtn: '保存', currentChat: '当前对话'
        },
        'ja-JP': {
            newChat: '新しいチャット', chatStyle: 'スタイル:', styleNormal: '普通', styleRespectful: '丁寧', styleFriendly: 'フレンドリー', language: '言語:', settings: 'API設定', aiAssistant: 'AIアシスタント', welcome1: 'こんにちは！私はAIアシスタントです。', welcome2: 'APIキーが必要です。「API設定」をクリックして入力してください。', inputPlaceholder: '質問を入力...', disclaimer: 'AIは間違えることがあります。', settingsTitle: 'API設定', settingsDesc: 'GeminiまたはOpenAI of APIキーが必要です。', apiKeyLabel: 'APIキー', customPromptLabel: 'カスタムロール', customPromptPlaceholder: '例：あなたはプログラマーです...', getKey: '無料でキーを取得', saveBtn: '保存', currentChat: '現在のチャット'
        },
        'de-DE': {
            newChat: 'Neuer Chat', chatStyle: 'Stil:', styleNormal: 'Normal', styleRespectful: 'Höflich', styleFriendly: 'Freundlich', language: 'Sprache:', settings: 'API-Einstellungen', aiAssistant: 'AI Assistent', welcome1: 'Hallo! Ich bin ein KI-Assistent.', welcome2: 'Ich brauche einen API-Schlüssel. Klicken Sie auf "API-Einstellungen".', inputPlaceholder: 'Frage hier eingeben...', disclaimer: 'KI kann Fehler machen.', settingsTitle: 'API-Einstellungen', settingsDesc: 'Ein API-Schlüssel ist erforderlich.', apiKeyLabel: 'API-Schlüssel', customPromptLabel: 'Benutzerdefinierte Rolle', customPromptPlaceholder: 'Beispiel: Du bist ein Programmierer...', getKey: 'Hier Schlüssel holen', saveBtn: 'Speichern', currentChat: 'Aktueller Chat'
        },
        'fr-FR': {
            newChat: 'Nouveau chat', chatStyle: 'Style:', styleNormal: 'Normal', styleRespectful: 'Respectueux', styleFriendly: 'Amical', language: 'Langue:', settings: 'Paramètres API', aiAssistant: 'Assistant IA', welcome1: 'Bonjour ! Je suis un assistant IA.', welcome2: 'J\'y ai besoin d\'une clé API.', inputPlaceholder: 'Posez votre question...', disclaimer: 'L\'IA peut faire des erreurs.', settingsTitle: 'Paramètres API', settingsDesc: 'Une clé API est requise.', apiKeyLabel: 'Clé API', customPromptLabel: 'Rôle personnalisé', customPromptPlaceholder: 'Ex: Vous êtes un programmeur expert...', getKey: 'Obtenir une clé', saveBtn: 'Enregistrer', currentChat: 'Discussion actuelle'
        },
        'ko-KR': {
            newChat: '새 채팅', chatStyle: '스타일:', styleNormal: '일반', styleRespectful: '존댓말', styleFriendly: '반말', language: '언어:', settings: 'API 설정', aiAssistant: 'AI 어시스턴트', welcome1: '안녕하세요! 저는 AI 어시스턴트입니다.', welcome2: 'API 키가 필요합니다. 설정을 클릭하세요.', inputPlaceholder: '질문을 입력하세요...', disclaimer: 'AI는 실수를 할 수 있습니다.', settingsTitle: 'API 설정', settingsDesc: 'API 키가 필요합니다.', apiKeyLabel: 'API 키', customPromptLabel: '사용자 지정 역할', customPromptPlaceholder: '예: 당신은 프로그래머입니다...', getKey: '무료 키 받기', saveBtn: '저장', currentChat: '현재 대화'
        },
        'it-IT': {
            newChat: 'Nuova chat', chatStyle: 'Stile:', styleNormal: 'Normale', styleRespectful: 'Rispettoso', styleFriendly: 'Amichevole', language: 'Lingua:', settings: 'Impostazioni API', aiAssistant: 'Assistente IA', welcome1: 'Ciao! Sono un assistente IA.', welcome2: 'Ho bisogno di una chiave API. Clicca su "Impostazioni API".', inputPlaceholder: 'Scrivi la tua domanda...', disclaimer: 'L\'IA può sbagliare.', settingsTitle: 'Impostazioni API', settingsDesc: 'È richiesta una chiave API.', apiKeyLabel: 'Chiave API', customPromptLabel: 'Ruolo Personalizzato', customPromptPlaceholder: 'Es: Sei un programmatore...', getKey: 'Ottieni una chiave', saveBtn: 'Salva', currentChat: 'Conversazione corrente'
        },
        'ar-SA': {
            newChat: 'محادثة جديدة', chatStyle: 'الأسلوب:', styleNormal: 'عادي', styleRespectful: 'محترم', styleFriendly: 'ودود', language: 'اللغة:', settings: 'إعدادات API', aiAssistant: 'مساعد الذكاء الاصطناعي', welcome1: 'مرحباً! أنا مساعد ذكي.', welcome2: 'أحتاج إلى مفتاح API.', inputPlaceholder: 'اكتب سؤالك هنا...', disclaimer: 'الذكاء الاصطناعي قد يخطئ.', settingsTitle: 'إعدادات API', settingsDesc: 'مفتاح API مطلوب.', apiKeyLabel: 'مفتاح API', customPromptLabel: 'دور مخصص', customPromptPlaceholder: 'مثال: أنت مبرمج...', getKey: 'احصل على مفتاح', saveBtn: 'حفظ', currentChat: 'المحادثة الحالية'
        },
        'hi-IN': {
            newChat: 'नयी चैट', chatStyle: 'शैली:', styleNormal: 'सामान्य', styleRespectful: 'आदरपूर्ण', styleFriendly: 'अनुकूल', language: 'भाषा:', settings: 'API सेटिंग्स', aiAssistant: 'AI सहायक', welcome1: 'नमस्ते! मैं एक AI सहायक हूँ।', welcome2: 'मुझे API कुंजी की आवश्यकता है।', inputPlaceholder: 'अपना प्रश्न यहाँ लिखें...', disclaimer: 'AI गलतियाँ कर सकता है।', settingsTitle: 'API सेटिंग्स', settingsDesc: 'API कुंजी की आवश्यकता है।', apiKeyLabel: 'API कुंजी', customPromptLabel: 'कस्टम भूमिका', customPromptPlaceholder: 'उदाहरण: आप एक प्रोग्रामर हैं...', getKey: 'कुंजी प्राप्त करें', saveBtn: 'सहेजें', currentChat: 'वर्तमान बातचीत'
        },
        'tr-TR': {
            newChat: 'Yeni Sohbet', chatStyle: 'Stil:', styleNormal: 'Normal', styleRespectful: 'Saygılı', styleFriendly: 'Samimi', language: 'Dil:', settings: 'API Ayarları', aiAssistant: 'Yapay Zeka Asistanı', welcome1: 'Merhaba! Ben bir yapay zeka asistanıyım.', welcome2: 'Bir API anahtarına ihtiyacım var.', inputPlaceholder: 'Sorunuzu yazın...', disclaimer: 'Yapay zeka hata yapabilir.', settingsTitle: 'API Ayarları', settingsDesc: 'API anahtarı gereklidir.', apiKeyLabel: 'API Anahtarı', customPromptLabel: 'Özel Rol', customPromptPlaceholder: 'Örn: Sen bir programcısın...', getKey: 'Anahtar al', saveBtn: 'Kaydet', currentChat: 'Mevcut sohbet'
        },
        'pt-BR': {
            newChat: 'Novo chat', chatStyle: 'Estilo:', styleNormal: 'Normal', styleRespectful: 'Respeitoso', styleFriendly: 'Amigável', language: 'Idioma:', settings: 'Config. da API', aiAssistant: 'Assistente IA', welcome1: 'Olá! Sou um assistente inteligente.', welcome2: 'Preciso de uma chave API.', inputPlaceholder: 'Digite sua pergunta...', disclaimer: 'A IA pode cometer erros.', settingsTitle: 'Configurações da API', settingsDesc: 'É necessária uma chave API.', apiKeyLabel: 'Chave API', customPromptLabel: 'Papel Personalizado', customPromptPlaceholder: 'Ex: Você é um programador...', getKey: 'Obter chave grátis', saveBtn: 'Salvar', currentChat: 'Conversa atual'
        },
        'kk-KZ': {
            newChat: 'Жаңа чат', chatStyle: 'Стиль:', styleNormal: 'Қалыпты', styleRespectful: 'Сыпайы', styleFriendly: 'Достық', language: 'Тіл:', settings: 'API баптаулары', aiAssistant: 'AI Көмекші', welcome1: 'Сәлем! Мен ақылды көмекшімін.', welcome2: 'Маған API кілті қажет.', inputPlaceholder: 'Сұрағыңызды жазыңыз...', disclaimer: 'AI қателесуі мүмкін.', settingsTitle: 'API баптаулары', settingsDesc: 'API кілті қажет.', apiKeyLabel: 'API кілті', customPromptLabel: 'Өзіндік рөл', customPromptPlaceholder: 'Мысалы: Сіз программистсіз...', getKey: 'Кілтті алу', saveBtn: 'Сақтау', currentChat: 'Ағымдағы әңгіме'
        },
        'ky-KG': {
            newChat: 'Жаңы маек', chatStyle: 'Стиль:', styleNormal: 'Кадимки', styleRespectful: 'Сылык', styleFriendly: 'Достук', language: 'Тил:', settings: 'API жөндөөлөрү', aiAssistant: 'AI Жардамчы', welcome1: 'Салам! Мен акылдуу жардамчымын.', welcome2: 'Мага API ачкычы керек.', inputPlaceholder: 'Сурооңузду жазыңыз...', disclaimer: 'AI жаңылышы мүмкүн.', settingsTitle: 'API жөндөөлөрү', settingsDesc: 'API ачкычы керек.', apiKeyLabel: 'API ачкычы', customPromptLabel: 'Өзгөчө ролу', customPromptPlaceholder: 'Мисалы: Сиз программистсіз...', getKey: 'Ачкычты алуу', saveBtn: 'Сактоо', currentChat: 'Учурдагы маек'
        },
        'uz-UZ': {
            newChat: 'Yangi chat', chatStyle: 'Uslub:', styleNormal: 'Oddiy', styleRespectful: 'Hurmat bilan', styleFriendly: 'Do\'stona', language: 'Til:', settings: 'API sozlamalari', aiAssistant: 'AI Yordamchi', welcome1: 'Salom! Men aqlli yordamchiman.', welcome2: 'Menga API kaliti kerak.', inputPlaceholder: 'Savolingizni yozing...', disclaimer: 'AI xato qilishi mumkin.', settingsTitle: 'API sozlamalari', settingsDesc: 'API kaliti kerak.', apiKeyLabel: 'API kaliti', customPromptLabel: 'Maxsus rol', customPromptPlaceholder: 'Masalan: Siz dasturchisiz...', getKey: 'Kalitni olish', saveBtn: 'Saqlash', currentChat: 'Joriy suhbat'
        }
    };

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
    const chatLanguage = document.getElementById('chat-language');
    
    // New Feature Elements
    const clearChatBtn = document.getElementById('clear-chat-btn');
    const exportChatBtn = document.getElementById('export-chat-btn');
    const customPromptInput = document.getElementById('custom-prompt');
    
    // State
    let apiKey = localStorage.getItem('gemini_api_key') || 
        ((typeof GEMINI_API_KEY !== 'undefined' && GEMINI_API_KEY !== "YOUR_API_KEY_HERE") ? GEMINI_API_KEY : '');
    let customPromptText = localStorage.getItem('custom_prompt') || '';
    let chatHistory = [];
    let currentImageBase64 = null;
    let currentImageMimeType = null;
    let isRecording = false;

    // Translation Logic
    function applyTranslations() {
        const langVal = chatLanguage ? chatLanguage.value : 'auto';
        const targetLang = (langVal === 'auto' || !translations[langVal]) ? 'ru-RU' : langVal;
        const dict = translations[targetLang] || translations['ru-RU'];
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.innerText = dict[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.placeholder = dict[key];
            }
        });
        
        document.title = dict['aiAssistant'] || 'AI Chat';
    }

    if (chatLanguage) {
        chatLanguage.addEventListener('change', applyTranslations);
    }
    
    // Initial translation application
    applyTranslations();

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
        if(customPromptInput) customPromptInput.value = customPromptText;
        settingsModal.classList.add('active');
    });

    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });

    saveSettingsBtn.addEventListener('click', () => {
        apiKey = apiKeyInput.value.trim();
        if(customPromptInput) {
            customPromptText = customPromptInput.value.trim();
            localStorage.setItem('custom_prompt', customPromptText);
        }
        localStorage.setItem('gemini_api_key', apiKey);
        updateApiStatus();
        settingsModal.classList.remove('active');
        
        if (apiKey) {
            addBotMessage("Настройки сохранены. Теперь вы можете задавать мне любые вопросы.");
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
                <div class="message-avatar"><i class="fa-solid fa-atom"></i></div>
                <div class="message-content">
                    <p>Новый чат начат. Чем могу помочь?</p>
                </div>
            </div>
        `;
        chatHistory = [];
        sidebar.classList.remove('active');
    });

    // Clear Chat
    if(clearChatBtn) {
        clearChatBtn.addEventListener('click', () => {
            if (confirm("Вы уверены, что хотите очистить текущий диалог?")) {
                chatMessages.innerHTML = '';
                chatHistory = [];
                addBotMessage("Чат очищен. Чем могу помочь?");
            }
        });
    }

    // Export Chat
    if(exportChatBtn) {
        exportChatBtn.addEventListener('click', () => {
            if (chatHistory.length === 0) {
                alert("Чат пуст. Нечего экспортировать.");
                return;
            }
            let exportText = "=== Экспорт чата AI Ассистента ===\n\n";
            chatHistory.forEach(msg => {
                const roleName = msg.role === 'model' || msg.role === 'assistant' ? 'AI' : 'Вы';
                let content = "";
                
                if (msg.parts) {
                    const textPart = msg.parts.find(p => p.text);
                    if (textPart) content = textPart.text;
                    else content = "[Изображение/Файл]";
                } else if (msg.content) {
                    if (typeof msg.content === 'string') content = msg.content;
                    else content = "[Сложный контент]";
                }

                exportText += `[${roleName}]:\n${content}\n\n`;
            });
            
            const blob = new Blob([exportText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `chat_export_${new Date().toISOString().slice(0,10)}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Mobile menu
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click handler from instantly closing it
        sidebar.classList.toggle('active');
    });

    // Close sidebar on mobile and set active class when a chat history item is clicked
    const chatHistoryContainer = document.getElementById('chat-history');
    if (chatHistoryContainer) {
        chatHistoryContainer.addEventListener('click', (e) => {
            const item = e.target.closest('.history-item');
            if (item) {
                document.querySelectorAll('.history-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                sidebar.classList.remove('active');
            }
        });
    }

    // Close sidebar on mobile when clicking outside the sidebar
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
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
        // recognition.lang is set dynamically before start()
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
                const langVal = chatLanguage ? chatLanguage.value : 'auto';
                if (langVal !== 'auto') {
                    recognition.lang = langVal;
                } else {
                    recognition.lang = ''; // Let browser decide or use document language
                }
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

        const typingId = showTypingIndicator();

        try {
            let responseText = "";
            if (!apiKey) {
                // Use server proxy (API key stored in Vercel environment variable)
                const systemInstruction = buildSystemInstruction(chatHistory);
                responseText = await callServerAPI(chatHistory, systemInstruction);
            } else if (apiKey.startsWith('sk-')) {
                responseText = await callOpenAI(chatHistory);
            } else {
                responseText = await callGeminiAPI(chatHistory);
            }
            removeMessage(typingId);
            addBotMessage(responseText);
            chatHistory.push({ role: "model", parts: [{ text: responseText }] });
        } catch (error) {
            removeMessage(typingId);
            let errMsg = error.message;
            if (apiKey && apiKey.startsWith('sk-') && (errMsg.includes('Failed to fetch') || errMsg.includes('fetch') || errMsg.includes('network') || errMsg.includes('Network'))) {
                errMsg += " (CORS Error: OpenAI API запрещает прямые запросы из браузера. Пожалуйста, используйте ключ Gemini)";
            }
            addBotMessage(`Произошла ошибка: ${errMsg}. Проверьте правильность API ключа или подключение к интернету.`, true);
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
        
        let formattedText = escapeHTML(text);

        // Handle custom image syntax: ![description](keyword) or ![description](http://...)
        // First handle real URLs
        formattedText = formattedText.replace(/!\[(.*?)\]\((https?:\/\/.*?)\)/g, (match, altText, url) => {
            const cleanAlt = escapeHTML(altText || "image");
            return `<img src="${url}" class="message-image" alt="${cleanAlt}" onload="scrollToBottom()">`;
        });
        // Then handle keyword-based generator
        formattedText = formattedText.replace(/!\[(.*?)\]\(((?!http|https:\/\/).+?)\)/g, (match, altText, keyword) => {
            const cleanKeyword = encodeURIComponent(keyword.trim().replace(/\s+/g, ','));
            const cleanAlt = escapeHTML(altText || keyword);
            return `<img src="https://loremflickr.com/640/480/${cleanKeyword}" class="message-image" alt="${cleanAlt}" onload="scrollToBottom()">`;
        });
        
        // Handle code blocks first to protect their newlines
        const codeBlocks = [];
        formattedText = formattedText.replace(/\`\`\`([\s\S]*?)\`\`\`/g, (match, p1) => {
            codeBlocks.push(p1);
            return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
        });

        // Now replace newlines and simple markdown
        formattedText = formattedText
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\`([^`]+)\`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');

        // Restore code blocks with UI
        formattedText = formattedText.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => {
            const code = codeBlocks[index];
            return `<div class="code-wrapper"><button class="copy-code-btn" title="Копировать код"><i class="fa-regular fa-copy"></i> Код</button><pre><code>${code}</code></pre></div>`;
        });

        // Create action buttons (Listen, Copy)
        const actionsHtml = isError ? '' : `
            <div class="message-actions">
                <button class="action-btn listen-btn" title="Прослушать"><i class="fa-solid fa-volume-high"></i></button>
                <button class="action-btn copy-btn" title="Копировать"><i class="fa-regular fa-copy"></i></button>
            </div>
        `;

        msgDiv.innerHTML = `
            <div class="message-avatar"><i class="fa-solid fa-atom"></i></div>
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
                const langVal = chatLanguage ? chatLanguage.value : 'auto';
                if (langVal !== 'auto') {
                    utterance.lang = langVal;
                } else {
                    utterance.lang = 'ru-RU'; // Default to Russian if auto
                }
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

            // Handle code block copy buttons
            const codeCopyBtns = msgDiv.querySelectorAll('.copy-code-btn');
            codeCopyBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const codeElement = btn.nextElementSibling.querySelector('code');
                    if(codeElement) {
                        // Use original codeBlocks array text to preserve newlines perfectly
                        // But since we are extracting from DOM, innerText is okay
                        const codeText = codeElement.innerText;
                        navigator.clipboard.writeText(codeText).then(() => {
                            const originalHTML = btn.innerHTML;
                            btn.innerHTML = '<i class="fa-solid fa-check"></i> Скопировано';
                            btn.style.color = 'var(--success)';
                            setTimeout(() => {
                                btn.innerHTML = originalHTML;
                                btn.style.color = '';
                            }, 2000);
                        });
                    }
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
            <div class="message-avatar"><i class="fa-solid fa-atom"></i></div>
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

    // Build system instruction from UI state
    function buildSystemInstruction(history) {
        let sysText = "";
        if (customPromptText) {
            sysText += customPromptText + " ";
        }
        
        const styleValue = chatStyle ? chatStyle.value : "normal";
        const langVal = chatLanguage ? chatLanguage.value : "auto";
        const langName = chatLanguage && chatLanguage.options ? chatLanguage.options[chatLanguage.selectedIndex].text : "";

        if (langVal !== "auto") {
            const cleanLangName = langName.split(' (')[0];
            sysText += `Отвечай строго на языке: ${cleanLangName}. `;
        }

        sysText += "Ты можешь иллюстрировать свои ответы картинками. Если в контексте разговора уместно показать фотографию, изображение или иллюстрацию, обязательно вставляй её в свой ответ, используя формат: `![описание](ключевое_слово_на_английском)`. Например, если речь идет о Париже, ты можешь вставить `![Эйфелева башня](paris)`. Ключевое слово в круглых скобках обязательно должно быть на английском языке для работы поиска картинок. ";

        const lastUserMsg = history.filter(m => m.role === 'user').pop();
        const lastUserText = lastUserMsg && lastUserMsg.parts ? lastUserMsg.parts.find(p => p.text)?.text || "" : "";
        const asksForPhoto = /(покажи|скинь|пришли|картинк|фото|изображен|рисунок|демонстрируй)/i.test(lastUserText);
        if (asksForPhoto) {
            sysText += "КРИТИЧЕСКИ ВАЖНО: Пользователь явно попросил показать или прислать изображение/фотографию! Ты ОБЯЗАН прислать изображение, используя формат `![описание](english_keyword)`. Обязательно переведи ключевое слово в круглых скобках на английский язык, чтобы поиск сработал (например, если просят котика, напиши `![Котик](cat)`). ";
        }

        if (styleValue === "respectful") {
            sysText += "Твоя задача — общаться крайне уважительно, обращаться к собеседнику строго на 'Вы' и использовать вежливые формулировки, как при разговоре со старшим по возрасту или статусу. ";
        } else if (styleValue === "friendly") {
            sysText += "Твоя задача — общаться максимально дружелюбно, расслабленно, на 'ты', как с близким другом или с младшим. Можно использовать легкий сленг. ";
        }

        return sysText;
    }

    // Call Server Proxy API (Vercel Serverless Function)
    async function callServerAPI(history, systemInstruction) {
        const recentHistory = history.slice(-10);
        
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: recentHistory,
                systemInstruction: systemInstruction,
                temperature: 0.7,
                maxOutputTokens: 2000
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Ошибка сервера');
        }

        const data = await response.json();
        return data.text;
    }

    // Call Gemini API
    async function callGeminiAPI(history) {
        // We use flash model which supports both text and images
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        
        // Only sending the last 10 messages for context to avoid huge payloads
        const recentHistory = history.slice(-10);

        let systemInstructionText = "";
        if (customPromptText) {
            systemInstructionText += customPromptText + " ";
        }
        
        const styleValue = chatStyle ? chatStyle.value : "normal";
        const langVal = chatLanguage ? chatLanguage.value : "auto";
        const langName = chatLanguage && chatLanguage.options ? chatLanguage.options[chatLanguage.selectedIndex].text : "";

        if (langVal !== "auto") {
            // Extract just the language name from "Русский (Russian)" -> "Русский"
            const cleanLangName = langName.split(' (')[0];
            systemInstructionText += `Отвечай строго на языке: ${cleanLangName}. `;
        }

        systemInstructionText += "Ты можешь иллюстрировать свои ответы картинками. Если в контексте разговора уместно показать фотографию, изображение или иллюстрацию, обязательно вставляй её в свой ответ, используя формат: `![описание](ключевое_слово_на_английском)`. Например, если речь идет о Париже, ты можешь вставить `![Эйфелева башня](paris)`. Ключевое слово в круглых скобках обязательно должно быть на английском языке для работы поиска картинок. ";

        // Check if user is asking for photos to enforce strict response
        const lastUserMsg = history.filter(m => m.role === 'user').pop();
        const lastUserText = lastUserMsg && lastUserMsg.parts ? lastUserMsg.parts.find(p => p.text)?.text || "" : "";
        const asksForPhoto = /(покажи|скинь|пришли|картинк|фото|изображен|рисунок|демонстрируй)/i.test(lastUserText);
        if (asksForPhoto) {
            systemInstructionText += "КРИТИЧЕСКИ ВАЖНО: Пользователь явно попросил показать или прислать изображение/фотографию! Ты ОБЯЗАН прислать изображение, используя формат `![описание](english_keyword)`. Обязательно переведи ключевое слово в круглых скобках на английский язык, чтобы поиск сработал (например, если просят котика, напиши `![Котик](cat)`). ";
        }

        if (styleValue === "respectful") {
            systemInstructionText += "Твоя задача — общаться крайне уважительно, обращаться к собеседнику строго на 'Вы' и использовать вежливые формулировки, как при разговоре со старшим по возрасту или статусу. ";
        } else if (styleValue === "friendly") {
            systemInstructionText += "Твоя задача — общаться максимально дружелюбно, расслабленно, на 'ты', как с близким другом или с младшим. Можно использовать легкий сленг. ";
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

    // Call OpenAI API
    async function callOpenAI(history) {
        const API_URL = 'https://api.openai.com/v1/chat/completions';
        const recentHistory = history.slice(-10);

        let systemInstructionText = "";
        if (customPromptText) {
            systemInstructionText += customPromptText + " ";
        }

        const styleValue = chatStyle ? chatStyle.value : "normal";
        const langVal = chatLanguage ? chatLanguage.value : "auto";
        const langName = chatLanguage && chatLanguage.options ? chatLanguage.options[chatLanguage.selectedIndex].text : "";

        if (langVal !== "auto") {
            const cleanLangName = langName.split(' (')[0];
            systemInstructionText += `Отвечай строго на языке: ${cleanLangName}. `;
        }

        systemInstructionText += "Ты можешь иллюстрировать свои ответы картинками. Если в контексте разговора уместно показать фотографию, изображение или иллюстрацию, обязательно вставляй её в свой ответ, используя формат: `![описание](ключевое_слово_на_английском)`. Например, если речь идет о Париже, ты можешь вставить `![Эйфелева башня](paris)`. Ключевое слово в круглых скобках обязательно должно быть на английском языке для работы поиска картинок. ";

        // Check if user is asking for photos to enforce strict response
        const lastUserMsg = history.filter(m => m.role === 'user').pop();
        const lastUserText = lastUserMsg && lastUserMsg.parts ? lastUserMsg.parts.find(p => p.text)?.text || "" : "";
        const asksForPhoto = /(покажи|скинь|пришли|картинк|фото|изображен|рисунок|демонстрируй)/i.test(lastUserText);
        if (asksForPhoto) {
            systemInstructionText += "КРИТИЧЕСКИ ВАЖНО: Пользователь явно попросил показать или прислать изображение/фотографию! Ты ОБЯЗАН прислать изображение, используя формат `![описание](english_keyword)`. Обязательно переведи ключевое слово в круглых скобках на английский язык, чтобы поиск сработал (например, если просят котика, напиши `![Котик](cat)`). ";
        }

        if (styleValue === "respectful") {
            systemInstructionText += "Твоя задача — общаться крайне уважительно, обращаться к собеседнику строго на 'Вы' и использовать вежливые формулировки, как при разговоре со старшим по возрасту или статусу. ";
        } else if (styleValue === "friendly") {
            systemInstructionText += "Твоя задача — общаться максимально дружелюбно, расслабленно, на 'ты', как с близким другом или с младшим. Можно использовать легкий сленг. ";
        }

        const messages = [];
        if (systemInstructionText) {
            messages.push({ role: "system", content: systemInstructionText });
        }

        for (const msg of recentHistory) {
            const role = msg.role === 'model' ? 'assistant' : 'user';
            let content = '';
            
            const textPart = msg.parts?.find(p => p.text);
            const imgPart = msg.parts?.find(p => p.inlineData);

            if (imgPart) {
                content = [];
                if (textPart) {
                    content.push({ type: "text", text: textPart.text });
                }
                content.push({
                    type: "image_url",
                    image_url: { url: `data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}` }
                });
            } else if (textPart) {
                content = textPart.text;
            }
            
            messages.push({ role, content });
        }

        const requestBody = {
            model: "gpt-4o-mini", // fallback model, you can change to gpt-4o if needed
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || 'Ошибка сети OpenAI');
        }

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            throw new Error('Пустой ответ от OpenAI API');
        }
    }
});
