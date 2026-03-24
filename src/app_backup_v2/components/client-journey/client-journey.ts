import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-client-journey',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './client-journey.html',
    styleUrl: './client-journey.css'
})
export class ClientJourneyComponent {
    steps = [
        {
            day: '01-15',
            title: 'Deep System Audit',
            desc: 'We map your entire infrastructure, identifying bottlenecks, security gaps, and cost-leaks.',
            icon: 'fa-solid fa-magnifying-glass-chart'
        },
        {
            day: '16-45',
            title: 'AI-Core Foundation',
            desc: 'Deployment of your private AI Core and initial SmartOps automation pipelines.',
            icon: 'fa-solid fa-microchip'
        },
        {
            day: '46-75',
            title: 'Efficiency Migration',
            desc: 'Transitioning legacy workloads to high-performing Serverless/K8s environments.',
            icon: 'fa-solid fa-rocket'
        },
        {
            day: '76-90',
            title: 'Global Velocity',
            desc: 'Full-scale monitoring active with automated scaling and 24/7 security enforcement.',
            icon: 'fa-solid fa-chart-line'
        }
    ];
}
