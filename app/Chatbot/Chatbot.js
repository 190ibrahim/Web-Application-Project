import Application from '../Application.js';

export default class Chatbot extends Application {
    constructor(options) {
        super(options);
        this.API_KEY='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';
        this.submitButton;
        this.outPutElement;
        this.inputElement;
        this.historyElement;
        this.buttonElement;
        this.getMessage = this.getMessage.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.clearChat = this.clearChat.bind(this);
        this.addMessageToHistory = this.addMessageToHistory.bind(this);
    }

    init() {
        super.init();
        this.createHTML();
    }

    initDom() {
        this.submitButton = this.target.querySelector('.submit');
        this.outPutElement = this.target.querySelector('.output');
        this.inputElement = this.target.querySelector('.input-text');
        this.historyElement = this.target.querySelector('.chat-history');
        this.buttonElement = this.target.querySelector('.newchat');
        
        // console log to check
        console.log(this.submitButton, this.outPutElement, this.inputElement, this.historyElement, this.buttonElement);

        this.submitButton.addEventListener('click', this.getMessage);
        this.buttonElement.addEventListener('click', () => {
            console.log('New chat button clicked');
            this.clearChat();
        });        this.inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.getMessage();
            }
        });
        this.conversations = [];  // add a new property to store conversations
        this.currentConversation = [];  // store the current conversation
    }

    createHTML() {
        const container = document.createElement("div");
        container.classList.add("chatbot-container");

        // Create side-bar section
        const sideBar = document.createElement("div");
        sideBar.classList.add("side-bar");

        const newChatButton = document.createElement("button");
        newChatButton.classList.add("newchat");
        newChatButton.textContent = "New chat";
        sideBar.appendChild(newChatButton);

        const chatHistory = document.createElement("div");
        chatHistory.classList.add("chat-history");
        sideBar.appendChild(chatHistory);

        // Create main-screen section
        const mainScreen = document.createElement("div");
        mainScreen.classList.add("main-screen");

        const chatHeader = document.createElement("h2");
        chatHeader.classList.add("chat-header");
        chatHeader.textContent = "ChatGPT: Law Specialist";
        mainScreen.appendChild(chatHeader);
    
        // Chat output
        const outputDiv = document.createElement("div");
        outputDiv.classList.add("output");
        mainScreen.appendChild(outputDiv);

        // Bottom Section (Input + Button)
        const inputContainerDiv = document.createElement("div");
        inputContainerDiv.classList.add("input-container");

        const inputText = document.createElement("input");
        inputText.type = "text";
        inputText.classList.add("input-text");
        inputContainerDiv.appendChild(inputText);

        const submitDiv = document.createElement("button");
        submitDiv.classList.add("submit");
        submitDiv.textContent = "Submit";
        inputContainerDiv.appendChild(submitDiv);

        mainScreen.appendChild(inputContainerDiv);

        // Append sections to container
        container.appendChild(sideBar);
        container.appendChild(mainScreen);

        // Append container to the target element
        this.target.appendChild(container);
        
        // call initDom after the HTML structure is created and appended
        this.initDom();
    }

    
    addMessageToHistory(message) {
        const pElement = document.createElement('p');
        pElement.textContent = `${message}`;
        this.historyElement.append(pElement);
    }
    


    async getMessage() {
        console.log('clicked');
        const userInput = this.inputElement.value;
        this.addMessageToHistory(userInput, 'User');
    
       const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model:"gpt-3.5-turbo",
                messages:[{role:"user", content:"You are a helpful assistant that specializes in law. Your purpose is to help users with legal information, answer their questions on various legal topics, and assist them in understanding complex legal jargon. You can provide information on a wide array of legal topics including criminal law, civil law, constitutional law, corporate law, and international law. However, it's important to note that while you're knowledgeable about the law, you can't provide legal advice or opinions on specific cases."}], // replaced with userInput
                temperature:0.7,
                max_tokens:100
            })
        }
        let data;
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            data = await response.json();
            console.log(data);
            this.outPutElement.textContent = data.choices[0].message.content;
            // this.addMessageToHistory(data.choices[0].message.content, 'Bot');
        } catch(error) {
            console.log('API call failed:', error);
        }
        // Ensure 'data' is defined before accessing its properties.
        if (data && data.choices[0].message.content === 'Bye') {
            this.endChat();
        }
    }

    clearInput(){
        this.inputElement.value = '';
    }



    clearChat() {
        console.log('clearChat function called');
    
        // Check if the outPutElement is defined
        if (this.outPutElement) {
            console.log('outPutElement:', this.outPutElement);
            this.outPutElement.textContent = '';
        } else {
            console.log('outPutElement is not defined');
        }
    
        // Clear the current conversation
        console.log('currentConversation before clearing:', this.currentConversation);
        this.currentConversation = [];
        console.log('currentConversation after clearing:', this.currentConversation);
    
        // Check if the submitButton is defined
        if (this.submitButton) {
            console.log('submitButton:', this.submitButton);
            this.submitButton.disabled = false;
        } else {
            console.log('submitButton is not defined');
        }
    }

    endChat() {
        // Save the current conversation to the conversations array
        this.conversations.push(this.currentConversation);
        // Create a button for the finished conversation
        const convoButton = document.createElement('button');
        convoButton.textContent = `Conversation ${this.conversations.length}`;
        convoButton.addEventListener('click', () => {
            // When clicked, load this conversation into the chat
            this.loadConversation(this.conversations.length - 1);
        });
        // Add the button to the history element
        this.historyElement.append(convoButton);
        // Clear the current chat
        this.clearChat();
    }

    loadConversation(index) {
        // Clear the current chat
        this.clearChat();
        // Load the conversation with the given index
        const conversation = this.conversations[index];
        for (const messageObj of conversation) {
            const pElement = document.createElement('p');
            pElement.textContent = `${messageObj.sender}: ${messageObj.message}`;
            this.outPutElement.append(pElement);
        }
    }

    

    destroy() {
        if (this.submitButton) {
            this.submitButton.removeEventListener('click', this.getMessage);
        }
        if (this.buttonElement) {
            this.buttonElement.removeEventListener('click', this.clearChat);
        }
        super.destroy();
    }
}
 








