import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';

@Component({
    selector: 'app-ai-chatbot',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './ai-chatbot.html',
    styleUrl: './ai-chatbot.css'
})
export class AIChatbotComponent implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

    isOpen = false;
    userInput = '';
    isTyping = false;
    socket: any;

    messages = [
        { type: 'bot', text: 'Hi! I am the Arbor Technologies AI Assistant. How can I help you today?' }
    ];

    quickActions = [
        'Cloud Savings',
        'AI Strategy',
        'System Health',
        'Contact Sales'
    ];

    ngOnInit() {
        this.initSocket();
    }

    ngOnDestroy() {
        if (this.socket) this.socket.disconnect();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    initSocket() {
        this.socket = io('http://localhost:8081');

        this.socket.on('ai_response', (data: any) => {
            this.isTyping = false;
            this.messages.push({ type: 'bot', text: data.text });
        });
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
    }

    handleQuickAction(action: string) {
        this.messages.push({ type: 'user', text: action });
        this.sendToAI(action);
    }

    sendMessage() {
        if (!this.userInput.trim()) return;
        const text = this.userInput;
        this.messages.push({ type: 'user', text });
        this.userInput = '';
        this.sendToAI(text);
    }

    sendToAI(query: string) {
        this.isTyping = true;
        this.socket.emit('chat_message', { query });
    }
}

