import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-careers',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './careers.html',
    styleUrl: './careers.css'
})
export class CareersComponent {
    jobs = [
        { title: 'Senior AI Engineer', type: 'Full-time', location: 'Remote', dept: 'Engineering' },
        { title: 'DevOps Architect (SRE)', type: 'Full-time', location: 'EU/US Timezones', dept: 'SmartOps' },
        { title: 'Backend Lead (Node.js/AWS)', type: 'Contract', location: 'IST/Remote', dept: 'Core Platform' }
    ];
}
