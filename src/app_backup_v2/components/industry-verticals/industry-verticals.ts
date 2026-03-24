import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-industry-verticals',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './industry-verticals.html',
    styleUrl: './industry-verticals.css'
})
export class IndustryVerticalsComponent {
    verticals = [
        {
            title: 'FinTech',
            icon: 'fa-solid fa-vault',
            focus: 'Security & Compliance',
            benefit: 'SOC2/ISO Ready Architecture & Fraud Detection AI.'
        },
        {
            title: 'HealthTech',
            icon: 'fa-solid fa-heart-pulse',
            focus: 'Data Privacy',
            benefit: 'HIPAA-Aligned Siloed Cloud & Automated Audit Logs.'
        },
        {
            title: 'E-commerce',
            icon: 'fa-solid fa-bag-shopping',
            focus: 'Hyper-Scaling',
            benefit: '0-Latency Product Search & Flash-Sale Auto-scaling.'
        },
        {
            title: 'SaaS Platforms',
            icon: 'fa-solid fa-layer-group',
            focus: 'Multi-Tenancy',
            benefit: 'Dynamic Resource Allocation & Global Distribution.'
        }
    ];
}
