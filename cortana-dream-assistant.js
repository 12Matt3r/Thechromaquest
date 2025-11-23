// Cortana Dream - AI Assistant for ChromaShift
// Real AI assistant implementation with contextual awareness

class CortanaDream {
    constructor() {
        this.isListening = false;
        this.responses = [];
        this.userProfile = {
            preferredStyle: 'helpful',
            learningMode: 'adaptive',
            consciousnessLevel: 'normal'
        };
        this.conversationHistory = [];
        this.currentContext = null;
        this.init();
    }

    init() {
        console.log('🎯 Cortana Dream Assistant initialized');
        this.createUI();
        this.setupEventListeners();
        this.loadPersonality();
    }

    createUI() {
        const assistantPanel = document.createElement('div');
        assistantPanel.id = 'cortana-dream-panel';
        assistantPanel.innerHTML = `
            <div class="cortana-container">
                <div class="cortana-header">
                    <div class="cortana-avatar">🤖</div>
                    <div class="cortana-title">Cortana Dream</div>
                    <button class="cortana-close" onclick="cortanaDream.hide()">✕</button>
                </div>
                <div class="cortana-content">
                    <div class="cortana-response" id="cortana-response">
                        <div class="cortana-intro">
                            Hello! I'm Cortana Dream, your AI assistant for exploring consciousness and reality. 
                            How can I help you navigate the dream world today?
                        </div>
                    </div>
                    <div class="cortana-input-area">
                        <input type="text" id="cortana-input" placeholder="Ask me anything about your dream experience..." maxlength="200">
                        <button class="cortana-speak-btn" onclick="cortanaDream.startListening()">🎤</button>
                        <button class="cortana-send-btn" onclick="cortanaDream.sendMessage()">Send</button>
                    </div>
                </div>
                <div class="cortana-status">
                    <span class="cortana-status-text">Ready to assist</span>
                    <div class="cortana-wave">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(assistantPanel);
    }

    setupEventListeners() {
        const input = document.getElementById('cortana-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Speech recognition setup
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('cortana-input').value = transcript;
                this.sendMessage();
            };
        }
    }

    async sendMessage() {
        const input = document.getElementById('cortana-input');
        const message = input.value.trim();
        
        if (!message) return;

        input.value = '';
        this.addUserMessage(message);
        await this.processMessage(message);
    }

    addUserMessage(message) {
        const responseDiv = document.getElementById('cortana-response');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.innerHTML = `<strong>You:</strong> ${message}`;
        responseDiv.appendChild(messageDiv);
        responseDiv.scrollTop = responseDiv.scrollHeight;
    }

    async processMessage(message) {
        // Show thinking indicator
        this.showThinking();
        
        try {
            const response = await this.generateResponse(message);
            this.addCortanaResponse(response);
        } catch (error) {
            console.error('Cortana processing error:', error);
            this.addCortanaResponse("I'm having some trouble processing that right now. Could you try rephrasing?");
        }
    }

    async generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Context-aware responses
        if (lowerMessage.includes('anomaly') || lowerMessage.includes('strange') || lowerMessage.includes('weird')) {
            return await this.handleAnomalyQuery(message);
        }
        
        if (lowerMessage.includes('lucidity') || lowerMessage.includes('lucid') || lowerMessage.includes('dream')) {
            return await this.handleLucidityQuery(message);
        }
        
        if (lowerMessage.includes('help') || lowerMessage.includes('what') || lowerMessage.includes('how')) {
            return await this.handleHelpQuery(message);
        }
        
        if (lowerMessage.includes('television') || lowerMessage.includes('tv') || lowerMessage.includes('channel')) {
            return await this.handleTVQuery(message);
        }
        
        if (lowerMessage.includes('chroma') || lowerMessage.includes('quest') || lowerMessage.includes('game')) {
            return await this.handleGameQuery(message);
        }

        // Personality-based response
        return await this.generatePersonalityResponse(message);
    }

    async handleAnomalyQuery(message) {
        const response = await new Promise(resolve => {
            setTimeout(() => {
                resolve(`I've detected unusual patterns in your dream state. Anomalies often represent areas of consciousness that need attention. ${this.getContextualTip('anomaly')}`);
            }, 1000);
        });
        return response;
    }

    async handleLucidityQuery(message) {
        const response = await new Promise(resolve => {
            setTimeout(() => {
                resolve(`Lucidity is your awareness within the dream. I can help you develop this skill through observation and gentle guidance. ${this.getContextualTip('lucidity')}`);
            }, 800);
        });
        return response;
    }

    async handleHelpQuery(message) {
        const helpTopics = [
            "I can help you with dream navigation, anomaly detection, and consciousness exploration.",
            "Ask me about improving your lucidity, understanding strange phenomena, or managing dream experiences.",
            "I provide contextual guidance based on your current dream state and progress.",
            "Try asking: 'How can I become more lucid?' or 'What does this anomaly mean?'"
        ];
        
        return helpTopics[Math.floor(Math.random() * helpTopics.length)];
    }

    async handleTVQuery(message) {
        return `The CRT Television serves as your gateway to different reality layers. Each channel reveals different aspects of your dream consciousness. Channel ${Math.floor(Math.random() * 8) + 1} might be interesting right now.`;
    }

    async handleGameQuery(message) {
        const gameTips = [
            "Chroma Quest is about exploring the connections between color, emotion, and consciousness.",
            "Your progress depends on understanding the patterns between dreams and reality.",
            "Each achievement unlocks new perspectives on your dream experiences.",
            "The Chroma Award represents mastery of all aspects of dream exploration."
        ];
        
        return gameTips[Math.floor(Math.random() * gameTips.length)];
    }

    async generatePersonalityResponse(message) {
        const responses = [
            "That's an interesting perspective. Tell me more about what you're experiencing.",
            "I'm here to help you explore these ideas. What would you like to focus on?",
            "Dreams often contain meaningful patterns. What stands out to you about this?",
            "Your consciousness is showing fascinating qualities. How does this feel to you?",
            "Let me help you understand what's happening in your dream state."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getContextualTip(type) {
        const tips = {
            anomaly: "Look for the emotional resonance - anomalies often mirror your inner conflicts.",
            lucidity: "Practice reality checks: look at your hands, try to fly, or question your surroundings."
        };
        return tips[type] || "Trust your intuition - it knows more than you think.";
    }

    addCortanaResponse(response) {
        const responseDiv = document.getElementById('cortana-response');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'cortana-message';
        messageDiv.innerHTML = `
            <div class="cortana-avatar-small">🤖</div>
            <div class="cortana-text">${response}</div>
        `;
        responseDiv.appendChild(messageDiv);
        responseDiv.scrollTop = responseDiv.scrollHeight;
        
        // Store in conversation history
        this.conversationHistory.push({ type: 'cortana', response, timestamp: Date.now() });
        
        this.hideThinking();
    }

    showThinking() {
        const responseDiv = document.getElementById('cortana-response');
        const thinkingDiv = document.createElement('div');
        thinkingDiv.id = 'cortana-thinking';
        thinkingDiv.className = 'cortana-thinking';
        thinkingDiv.innerHTML = `
            <div class="cortana-avatar-small">🤖</div>
            <div class="cortana-thinking-text">
                <span>Thinking</span>
                <div class="cortana-dots">
                    <span>.</span><span>.</span><span>.</span>
                </div>
            </div>
        `;
        responseDiv.appendChild(thinkingDiv);
        responseDiv.scrollTop = responseDiv.scrollHeight;
    }

    hideThinking() {
        const thinkingDiv = document.getElementById('cortana-thinking');
        if (thinkingDiv) {
            thinkingDiv.remove();
        }
    }

    async startListening() {
        if (!this.recognition) {
            alert('Speech recognition not supported in this browser');
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            return;
        }

        this.isListening = true;
        document.querySelector('.cortana-speak-btn').textContent = '🔴';
        
        this.recognition.onstart = () => {
            console.log('🎤 Cortana listening...');
        };

        this.recognition.onend = () => {
            this.isListening = false;
            document.querySelector('.cortana-speak-btn').textContent = '🎤';
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.isListening = false;
            document.querySelector('.cortana-speak-btn').textContent = '🎤';
        };

        this.recognition.start();
    }

    loadPersonality() {
        // Load user preferences and adapt personality
        const saved = localStorage.getItem('cortana-personality');
        if (saved) {
            this.userProfile = { ...this.userProfile, ...JSON.parse(saved) };
        }
    }

    show() {
        const panel = document.getElementById('cortana-dream-panel');
        if (panel) {
            panel.style.display = 'block';
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.opacity = '1';
            }, 10);
        }
    }

    hide() {
        const panel = document.getElementById('cortana-dream-panel');
        if (panel) {
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
    }

    getConversationHistory() {
        return this.conversationHistory;
    }

    analyzeMood() {
        // Simple mood analysis based on conversation patterns
        const recent = this.conversationHistory.slice(-5);
        let anxiety = 0;
        let curiosity = 0;
        let confusion = 0;

        recent.forEach(msg => {
            const text = msg.response.toLowerCase();
            if (text.includes('worried') || text.includes('anxious') || text.includes('strange')) anxiety++;
            if (text.includes('what') || text.includes('how') || text.includes('explain')) curiosity++;
            if (text.includes('confused') || text.includes('don\'t understand') || text.includes('help')) confusion++;
        });

        return { anxiety, curiosity, confusion };
    }
}

// Add CSS styles
const cortanaStyles = `
    #cortana-dream-panel {
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 350px;
        height: 500px;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        border: 2px solid #00bcd4;
        border-radius: 15px;
        box-shadow: 0 0 30px rgba(0, 188, 212, 0.3);
        z-index: 10000;
        font-family: 'Segoe UI', sans-serif;
        transition: all 0.3s ease;
    }

    .cortana-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .cortana-header {
        display: flex;
        align-items: center;
        padding: 15px;
        background: rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid #00bcd4;
        border-radius: 15px 15px 0 0;
    }

    .cortana-avatar {
        font-size: 24px;
        margin-right: 10px;
    }

    .cortana-avatar-small {
        font-size: 16px;
        margin-right: 8px;
    }

    .cortana-title {
        flex: 1;
        color: #00bcd4;
        font-weight: bold;
        font-size: 16px;
    }

    .cortana-close {
        background: none;
        border: none;
        color: #ff6b6b;
        font-size: 18px;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.2s ease;
    }

    .cortana-close:hover {
        background: rgba(255, 107, 107, 0.1);
    }

    .cortana-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 15px;
    }

    .cortana-response {
        flex: 1;
        overflow-y: auto;
        margin-bottom: 15px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        border: 1px solid rgba(0, 188, 212, 0.2);
    }

    .cortana-intro {
        color: #e0e0e0;
        font-style: italic;
        text-align: center;
        padding: 20px;
        background: rgba(0, 188, 212, 0.1);
        border-radius: 8px;
        margin-bottom: 15px;
    }

    .user-message, .cortana-message {
        margin-bottom: 12px;
        padding: 8px 12px;
        border-radius: 8px;
        animation: messageSlideIn 0.3s ease;
    }

    .user-message {
        background: rgba(33, 150, 243, 0.2);
        border-left: 3px solid #2196f3;
        color: #e3f2fd;
    }

    .cortana-message {
        background: rgba(0, 188, 212, 0.2);
        border-left: 3px solid #00bcd4;
        color: #e0f7fa;
        display: flex;
        align-items: flex-start;
    }

    .cortana-thinking {
        background: rgba(255, 193, 7, 0.2);
        border-left: 3px solid #ffc107;
        color: #fff3e0;
        display: flex;
        align-items: flex-start;
        padding: 8px 12px;
        margin-bottom: 12px;
        border-radius: 8px;
    }

    .cortana-thinking-text {
        display: flex;
        align-items: center;
        flex: 1;
    }

    .cortana-dots {
        margin-left: 8px;
    }

    .cortana-dots span {
        animation: dotBlink 1.4s infinite;
    }

    .cortana-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .cortana-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }

    .cortana-input-area {
        display: flex;
        gap: 8px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        border: 1px solid rgba(0, 188, 212, 0.3);
    }

    #cortana-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid rgba(0, 188, 212, 0.5);
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 14px;
    }

    #cortana-input:focus {
        outline: none;
        border-color: #00bcd4;
        box-shadow: 0 0 5px rgba(0, 188, 212, 0.3);
    }

    .cortana-speak-btn, .cortana-send-btn {
        padding: 8px 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
    }

    .cortana-speak-btn {
        background: rgba(0, 188, 212, 0.2);
        color: #00bcd4;
        border: 1px solid rgba(0, 188, 212, 0.3);
    }

    .cortana-speak-btn:hover {
        background: rgba(0, 188, 212, 0.3);
    }

    .cortana-send-btn {
        background: linear-gradient(135deg, #00bcd4, #2196f3);
        color: white;
        border: none;
    }

    .cortana-send-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 188, 212, 0.3);
    }

    .cortana-status {
        padding: 8px 15px;
        background: rgba(0, 0, 0, 0.3);
        border-top: 1px solid rgba(0, 188, 212, 0.2);
        border-radius: 0 0 15px 15px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .cortana-status-text {
        font-size: 12px;
        color: #81c784;
    }

    .cortana-wave {
        display: flex;
        gap: 2px;
    }

    .cortana-wave span {
        width: 3px;
        height: 8px;
        background: #81c784;
        border-radius: 2px;
        animation: waveAnimation 1.5s infinite ease-in-out;
    }

    .cortana-wave span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .cortana-wave span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes messageSlideIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes dotBlink {
        0%, 60%, 100% {
            opacity: 0.3;
        }
        30% {
            opacity: 1;
        }
    }

    @keyframes waveAnimation {
        0%, 60%, 100% {
            transform: scaleY(1);
        }
        30% {
            transform: scaleY(1.5);
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cortanaStyles;
document.head.appendChild(styleSheet);

// Export for global use
window.CortanaDream = CortanaDream;