import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-engagement-models',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './engagement-models.html',
    styleUrl: './engagement-models.css'
})
export class EngagementModelsComponent {
    models = [
        {
            title: 'Dedicated Squad',
            subtitle: 'Best for Complex Projects',
            desc: 'A full-stack team focused entirely on your product development and scaling.',
            features: ['Project Manager Included', 'Daily Syncs', 'Elastic Scaling', 'Direct Slack Access'],
            icon: 'fa-solid fa-people-group',
            link: '#contact'
        },
        {
            title: 'Managed Services',
            subtitle: 'Best for Infrastructure',
            desc: 'We handle your cloud, security, and 24/7 monitoring so you can focus on code.',
            features: ['99.9% SLA Guarantee', 'Security Patching', 'Cost Optimization', '24/7 SOC Monitoring'],
            icon: 'fa-solid fa-headset',
            link: '#contact'
        },
        {
            title: 'Technical Audit',
            subtitle: 'Best for Optimization',
            desc: 'A rapid 2-week deep dive into your architecture to find leaks and risks.',
            features: ['Cost Audit Report', 'Security Scan', 'Performance Roadmaps', 'Scalability Analysis'],
            icon: 'fa-solid fa-magnifying-glass-chart',
            link: '#strategy'
        }
    ];
}
