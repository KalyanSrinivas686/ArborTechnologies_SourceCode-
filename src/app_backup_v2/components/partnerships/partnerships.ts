import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-partnerships',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './partnerships.html',
    styleUrl: './partnerships.css'
})
export class PartnershipsComponent {
    partners = [
        { name: 'AWS', role: 'Advanced Consulting Partner', icon: 'fa-brands fa-aws' },
        { name: 'Microsoft Azure', role: 'Gold Cloud Platform Partner', icon: 'fa-solid fa-cloud' },
        { name: 'Google Cloud', role: 'Premier Tier Partner', icon: 'fa-brands fa-google' },
        { name: 'HashiCorp', role: 'Infrastructure Automation Partner', icon: 'fa-solid fa-cubes' },
        { name: 'Snowflake', role: 'Select Tech Partner', icon: 'fa-solid fa-snowflake' },
        { name: 'Datadog', role: 'Observability Partner', icon: 'fa-solid fa-dog' },
        { name: 'GitHub', role: 'Enterprise Partner', icon: 'fa-brands fa-github' },
        { name: 'Kubernetes', role: 'Certified Provider', icon: 'fa-solid fa-dharmachakra' }
    ];
}
