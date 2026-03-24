import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-suite',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-suite.html',
    styleUrl: './product-suite.css'
})
export class ProductSuiteComponent {
    products = [
        {
            id: 'sentinel',
            name: 'Arbor Sentinel',
            tagline: 'Autonomous Security Core',
            desc: 'Real-time threat detection and automated incident response powered by our proprietary AI engine.',
            features: ['24/7 Threat Hunting', 'Zero-Trust Architecture', 'Real-time Remediation'],
            icon: 'fa-solid fa-shield-halved',
            color: '#3b82f6'
        },
        {
            id: 'flow',
            name: 'Arbor Flow',
            tagline: 'Modern CloudOps Engine',
            desc: 'A unified control plane to manage, scale, and optimize multi-cloud infrastructure automatically.',
            features: ['Cost Anomaly Detection', 'GitOps Integration', '1-Click Scalability'],
            icon: 'fa-solid fa-wind',
            color: '#8b5cf6'
        },
        {
            id: 'insight',
            name: 'Arbor Insight',
            tagline: 'Intelligence & Analytics',
            desc: 'Deep visibility into your application performance and business metrics with predictive analytics.',
            features: ['Custom Data Pipelines', 'Predictive Forecasting', 'Executive Dashboards'],
            icon: 'fa-solid fa-chart-line',
            color: '#10b981'
        },
        {
            id: 'mealops',
            name: 'MealOps',
            tagline: 'Employee Benefits Unchained',
            desc: 'A futuristic digital wallet for corporate meal pass management with real-time UPI top-ups.',
            features: ['Instant UPI Funding', 'Dynamic Merchant Scan', 'Predictive Spend Analytics'],
            icon: 'fa-solid fa-utensils',
            color: '#a8ff78'
        }
    ];
}
