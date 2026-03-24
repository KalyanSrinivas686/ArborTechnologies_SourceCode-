import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;
  messages: {text: string, isUser: boolean}[] = [];
  currentMessage = '';

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.currentMessage.trim()) {
      this.messages.push({
        text: this.currentMessage,
        isUser: true
      });
      
      // Generate intelligent response based on user input
      const userMessage = this.currentMessage.toLowerCase();
      let botResponse = '';
      
      // Check for greetings first
      if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey') || userMessage.includes('good morning') || userMessage.includes('good afternoon') || userMessage.includes('good evening')) {
        botResponse = 'Hello! Welcome to Arbor Technologies! 👋\n\nI\'m here to help you with:\n🚀 DevOps & CI/CD solutions\n☁️ Cloud infrastructure setup\n💰 Cost optimization services\n🔒 Security & compliance\n📊 Monitoring & reliability\n\nWhat can I help you with today?';
      } else if (userMessage.includes('devops') || userMessage.includes('deployment') || userMessage.includes('ci/cd')) {
        botResponse = 'We specialize in DevOps excellence! Our services include CI/CD pipeline setup, automated testing, container orchestration with Docker/Kubernetes, and deployment strategies. Would you like to know more about any specific area?';
      } else if (userMessage.includes('cloud') || userMessage.includes('aws') || userMessage.includes('azure')) {
        botResponse = 'Our cloud infrastructure services cover AWS & Azure architecture, Infrastructure as Code with Terraform, auto-scaling groups, and 24/7 monitoring setup. We can help optimize your cloud costs by 30-50%. What specific cloud service interests you?';
      } else if (userMessage.includes('cost') || userMessage.includes('pricing') || userMessage.includes('optimize')) {
        botResponse = 'Cloud cost optimization is one of our core strengths! We provide cost analysis & reporting, resource rightsizing, reserved instance planning, and automated cost alerts. Most clients reduce costs by 30-50%. Would you like a free cost analysis?';
      } else if (userMessage.includes('monitoring') || userMessage.includes('reliability') || userMessage.includes('uptime')) {
        botResponse = 'We provide comprehensive infrastructure monitoring and reliability solutions including real-time monitoring, alerting & on-call support, log aggregation, and performance metrics. Our solutions prevent 90% of outages before they impact customers. Need help with monitoring setup?';
      } else if (userMessage.includes('security') || userMessage.includes('compliance') || userMessage.includes('audit')) {
        botResponse = 'Security & compliance is critical! We offer security audits, compliance automation, vulnerability scanning, and access management. Our enterprise-grade security ensures your infrastructure meets industry standards. What security concerns do you have?';
      } else if (userMessage.includes('database') || userMessage.includes('performance') || userMessage.includes('optimization')) {
        botResponse = 'Database optimization can dramatically improve your application performance! We provide query optimization, database design, backup & recovery, and performance tuning. Our clients see lightning-fast performance improvements. What database challenges are you facing?';
      } else if (userMessage.includes('consultation') || userMessage.includes('free') || userMessage.includes('health check')) {
        botResponse = 'Great! We offer a free 30-minute cloud infrastructure health check that includes cost analysis, security assessment, performance review, and optimization recommendations. Would you like to schedule this free consultation?';
      } else if (userMessage.includes('contact') || userMessage.includes('phone') || userMessage.includes('email')) {
        botResponse = 'You can reach our team directly at:\n📧 Email: arbortech.cloud@gmail.com\n📞 Phone: +91 9121650564\n💬 WhatsApp: Available for quick responses\n\nWhat\'s the best way to contact you?';
      } else if (userMessage.includes('pricing') || userMessage.includes('rates') || userMessage.includes('cost')) {
        botResponse = 'Our pricing is customized based on your specific needs. We offer:\n• Free 30-minute infrastructure health check\n• Project-based DevOps consulting\n• Monthly infrastructure management\n• Cloud cost optimization services\n\nWould you like a detailed quote for your requirements?';
      } else {
        botResponse = 'Thank you for your message! I can help you with:\n\n🚀 DevOps & CI/CD solutions\n☁️ Cloud infrastructure setup\n💰 Cost optimization\n🔒 Security & compliance\n📊 Monitoring & reliability\n🗄️ Database optimization\n\nWhat specific area would you like to discuss? For immediate assistance, call +91 9121650564.';
      }
      
      setTimeout(() => {
        this.messages.push({
          text: botResponse,
          isUser: false
        });
      }, 1000);
      
      this.currentMessage = '';
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
