import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-compliance',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './compliance.html',
    styleUrl: './compliance.css'
})
export class ComplianceComponent {
    standards = [
        { name: 'SOC2 Type II', desc: 'Enterprise-grade data security and privacy controls.', icon: 'fa-solid fa-file-shield' },
        { name: 'ISO 27001', desc: 'International standard for information security management.', icon: 'fa-solid fa-globe' },
        { name: 'HIPAA Ready', desc: 'Secure handling of healthcare and sensitive user data.', icon: 'fa-solid fa-notes-medical' },
        { name: 'GDPR Compliant', desc: 'Strict adherence to European data protection regulations.', icon: 'fa-solid fa-passport' }
    ];
}
