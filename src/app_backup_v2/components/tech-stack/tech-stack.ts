import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tech-stack',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tech-stack.html',
    styleUrl: './tech-stack.css'
})
export class TechStackComponent {
    techCategories = [
        {
            title: 'Cloud & Infrastructure',
            tools: [
                { name: 'AWS', icon: 'fa-brands fa-aws' },
                { name: 'Azure', icon: 'fa-solid fa-cloud' },
                { name: 'Google Cloud', icon: 'fa-brands fa-google' },
                { name: 'Terraform', icon: 'fa-solid fa-cubes' }
            ]
        },
        {
            title: 'DevOps & Automation',
            tools: [
                { name: 'Kubernetes', icon: 'fa-solid fa-dharmachakra' },
                { name: 'Docker', icon: 'fa-brands fa-docker' },
                { name: 'Jenkins', icon: 'fa-brands fa-jenkins' },
                { name: 'Ansible', icon: 'fa-solid fa-robot' }
            ]
        },
        {
            title: 'AI & Data Science',
            tools: [
                { name: 'PyTorch', icon: 'fa-solid fa-brain' },
                { name: 'TensorFlow', icon: 'fa-solid fa-microchip' },
                { name: 'OpenAI', icon: 'fa-solid fa-bolt' },
                { name: 'Python', icon: 'fa-brands fa-python' }
            ]
        },
        {
            title: 'Monitoring & Security',
            tools: [
                { name: 'Prometheus', icon: 'fa-solid fa-chart-line' },
                { name: 'Grafana', icon: 'fa-solid fa-desktop' },
                { name: 'ELK Stack', icon: 'fa-solid fa-magnifying-glass' },
                { name: 'Snyk', icon: 'fa-solid fa-shield-halved' }
            ]
        }
    ];
}
