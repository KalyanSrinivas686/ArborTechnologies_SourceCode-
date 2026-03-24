import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-methodology',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './methodology.html',
    styleUrl: './methodology.css'
})
export class MethodologyComponent {
    steps = [
        {
            id: '01',
            title: 'Discovery',
            subtitle: 'Technical Debt Extraction',
            description: 'We perform a deep audit of your current infrastructure to identify bottlenecks and hidden costs.',
            icon: 'fa-solid fa-magnifying-glass-chart'
        },
        {
            id: '02',
            title: 'Architect',
            subtitle: 'Blueprint Design',
            description: 'Designing a secure, multi-cloud or hybrid architecture that scales infinitely with your growth.',
            icon: 'fa-solid fa-drafting-compass'
        },
        {
            id: '03',
            title: 'Automate',
            subtitle: 'SmartOps Deployment',
            description: 'Implementing CI/CD pipelines and AI-driven monitoring to eliminate manual errors.',
            icon: 'fa-solid fa-microchip'
        },
        {
            id: '04',
            title: 'Scale',
            subtitle: 'Exponential Expansion',
            description: 'Continuously optimizing performance to handle massive traffic while keeping costs low.',
            icon: 'fa-solid fa-rocket'
        }
    ];
}
