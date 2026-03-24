import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pricing',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pricing.html',
    styleUrl: './pricing.css'
})
export class PricingComponent {
    plans = [
        {
            name: 'Launchpad',
            price: 'Custom',
            desc: 'Perfect for startups needing rapid infrastructure setup.',
            features: ['Cloud Foundation Setup', 'CI/CD Pipeline v1', 'Basic Monitoring', 'Shared Slack Support'],
            cta: 'Start Scaling',
            recommended: false
        },
        {
            name: 'Acceleration',
            price: 'Popular',
            desc: 'For high-growth teams scaling their AI/Cloud operations.',
            features: ['Kubernetes Migration', 'Security Audit (Monthly)', 'Auto-Scaling Config', 'Priority Engineering Access'],
            cta: 'Get Accelerated',
            recommended: true
        },
        {
            name: 'Elite Core',
            price: 'Enterprise',
            desc: 'Seamless managed services for global architectures.',
            features: ['24/7 Managed Ops', 'Custom AI Model Training', 'Zero-Trust Implementation', 'Dedicated Solutions Architect'],
            cta: 'Talk to Sales',
            recommended: false
        }
    ];
}
