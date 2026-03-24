import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-maturity-assessment',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './maturity-assessment.html',
    styleUrl: './maturity-assessment.css'
})
export class MaturityAssessmentComponent {
    currentStep = 0;
    showResult = false;
    score = 0;

    questions = [
        {
            text: 'How do you currently deploy your applications?',
            options: [
                { text: 'Manual FTP/Copy-Paste', score: 1 },
                { text: 'Basic Scripted Deploys', score: 2 },
                { text: 'Automated CI/CD Pipelines', score: 4 },
                { text: 'GitOps with Kubernetes', score: 5 }
            ]
        },
        {
            text: 'How is your infrastructure managed?',
            options: [
                { text: 'Traditional Data Center', score: 1 },
                { text: 'Cloud Portals (Manual)', score: 2 },
                { text: 'Infrastructure as Code (IaC)', score: 4 },
                { text: 'Automated Self-Healing Infra', score: 5 }
            ]
        },
        {
            text: 'What is your level of AI integration?',
            options: [
                { text: 'None / Researching', score: 1 },
                { text: 'Using External APIs (OpenAI, etc)', score: 3 },
                { text: 'Training/Fine-tuning Private Models', score: 4 },
                { text: 'AI Integrated into Core Ops', score: 5 }
            ]
        }
    ];

    selectOption(score: number) {
        this.score += score;
        if (this.currentStep < this.questions.length - 1) {
            this.currentStep++;
        } else {
            this.showResult = true;
        }
    }

    get resultTitle() {
        if (this.score < 6) return 'Digital Novice';
        if (this.score < 11) return 'Emerging Innovator';
        return 'Cloud Native Leader';
    }

    get resultDesc() {
        if (this.score < 6) return 'Your tech stack is holding you back. You are likely losing 30-40% of productivity to manual operations.';
        if (this.score < 11) return 'You have a solid foundation, but there is significant room for AI and automated scaling.';
        return 'You are ahead of the curve, but constant optimization is key to maintaining your edge.';
    }

    reset() {
        this.currentStep = 0;
        this.showResult = false;
        this.score = 0;
    }
}
