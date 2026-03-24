import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-global-advantage',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './global-advantage.html',
    styleUrl: './global-advantage.css'
})
export class GlobalAdvantageComponent {
    rows = [
        { feature: 'Infrastructure Setup', traditional: '2-4 Weeks (Manual)', arbor: '45 Seconds (AI-Orchestrated)', positive: true },
        { feature: 'Mean Time to Repair (MTTR)', traditional: '4-8 Hours', arbor: 'Instant AI Self-Healing', positive: true },
        { feature: 'Cost Optimization', traditional: 'Manual Review (Monthly)', arbor: 'Real-time Autonomous Rightsizing', positive: true },
        { feature: 'Security Patching', traditional: 'Scheduled Downtime', arbor: 'Zero-Downtime Live Patching', positive: true },
        { feature: 'Scaling Capability', traditional: 'Reactive / Horizontal', arbor: 'Predictive / Multi-Cloud Elastic', positive: true }
    ];
}
