import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-careers-lite',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './careers-lite.html',
    styleUrl: './careers-lite.css'
})
export class CareersLiteComponent {
    roles = [
        { title: 'Founding AI Engineer', location: 'Remote / Bangalore', type: 'Full-time' },
        { title: 'Cloud Infrastructure Architect', location: 'Remote / US-East', type: 'Full-time' },
        { title: 'Security Ops Specialist', location: 'Hybrid / EMEA', type: 'Full-time' }
    ];
}
