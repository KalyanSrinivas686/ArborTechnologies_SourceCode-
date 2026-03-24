import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-ai-agent',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './ai-agent.html',
    styleUrl: './ai-agent.css'
})
export class AiAgentComponent {
    isOpen = false;
    input = '';
    messages = [
        { role: 'bot', text: 'Hello! I am the Arbor intelligence agent. How can I help you optimize your infrastructure today?' }
    ];

    isTyping = false;

    toggleChat() {
        this.isOpen = !this.isOpen;
    }

    sendMessage() {
        if (this.input.trim() && !this.isTyping) {
            const userText = this.input;
            this.messages.push({ role: 'user', text: userText });
            const query = userText.toLowerCase();
            this.input = '';
            this.isTyping = true;

            // Accurate response logic based on Arbor Tech services
            setTimeout(() => {
                let response = "I've logged your query. Our lead architect, Kalyan, will be notified. Would you like to leave your email so we can reach out?";

                // Keyword Mapping for Accuracy
                if (query.includes('hi') || query.includes('hello')) {
                    response = "Welcome to Arbor Technologies! I'm your AI assistant. I can help with architecture design, cost optimization, or security audits. What can I help you build today?";
                } else if (query.includes('who') || query.includes('about')) {
                    response = "Arbor Technologies is an AI-first infrastructure firm specializing in DevOps, Cloud Engineering, and Intelligent Automation. Our mission is to build future-ready architecture for global enterprises.";
                } else if (query.includes('contact') || query.includes('call') || query.includes('schedule')) {
                    response = "You can reach us at kalyanupadhayayula@gmail.com or call +91 9121650564. Alternatively, use the 'Get a Free Quote' button in the header!";
                } else if (query.includes('cost') || query.includes('save') || query.includes('money')) {
                    response = "Our systems typically reduce cloud waste by 30-40%. Use our Cloud Calculator section below to see your potential ROI in real-time.";
                } else if (query.includes('security') || query.includes('safe') || query.includes('compliance')) {
                    response = "Security is our core. We are SOC2 and ISO 27001 compliant, utilizing Zero-Trust architecture for every deployment.";
                } else if (query.includes('pricing') || query.includes('cost') || query.includes('plans')) {
                    response = "We offer 3 scalable tiers: Launchpad (Startups), Acceleration (Growth), and Elite Core (Global Enterprise). Detailed features are in the Pricing section!";
                } else if (query.includes('devops') || query.includes('cloud') || query.includes('kubernetes')) {
                    response = "Our elite DevOps team handles K8s orchestration, CI/CD automation, and multi-region redundancy. Check our 'Infrastructure' section for technical specs.";
                } else if (query.includes('ai') || query.includes('intelligence') || query.includes('bot')) {
                    response = "We integrate custom AI agents and LLM operations directly into your infra. This chatbot is a small example of our autonomous agent capabilities.";
                }

                this.messages.push({ role: 'bot', text: response });
                this.isTyping = false;
            }, 600); // Fast but feels 'humanly' responsive
        }
    }
}
