import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-insights',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './insights.html',
    styleUrl: './insights.css'
})
export class InsightsComponent {
    articles = [
        {
            date: 'Jan 15, 2026',
            category: 'Cloud Strategy',
            title: 'The Hidden ROI of Serverless Architectures',
            excerpt: 'How moving beyond EC2 saved our clients an average of 42% on infrastructure spend.',
            img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
        },
        {
            date: 'Jan 10, 2026',
            category: 'AI & ML',
            title: 'Autonomous Security: AI-Core in Production',
            excerpt: 'Detecting 0-day vulnerabilities before they hit your load balancer.',
            img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
        },
        {
            date: 'Jan 05, 2026',
            category: 'Scalability',
            title: 'Zero-Downtime Multi-Cloud Deployments',
            excerpt: 'Leveraging Kubernetes and Terraform to achieve 99.999% availability.',
            img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
        }
    ];
}
