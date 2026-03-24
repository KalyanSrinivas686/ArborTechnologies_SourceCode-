import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-trust-center',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './trust-center.html',
    styleUrl: './trust-center.css'
})
export class TrustCenterComponent {
    securityFeatures = [
        {
            title: 'Zero Trust Network',
            desc: 'Moving beyond perimeter security with identity-aware access controls.',
            icon: 'fa-solid fa-user-shield'
        },
        {
            title: 'Real-time Patches',
            desc: 'AI-driven vulnerability scanning and automated patching in CI/CD.',
            icon: 'fa-solid fa-clock-rotate-left'
        },
        {
            title: 'Data Sovereignty',
            desc: 'Ensuring your data stays within required regions and compliance zones.',
            icon: 'fa-solid fa-globe'
        },
        {
            title: '24/7 SOC Monitoring',
            desc: 'Our Managed Security Operations Center hunts threats while you sleep.',
            icon: 'fa-solid fa-microchip-ai'
        }
    ];

    certificates = [
        'SOC2 Type II', 'ISO 27001', 'HIPAA Ready', 'GDPR Compliant'
    ];
}
