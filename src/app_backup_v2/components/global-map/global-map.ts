import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-global-map',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './global-map.html',
    styleUrl: './global-map.css'
})
export class GlobalMapComponent {
    nodes = [
        { city: 'New York', region: 'US-East', x: 25, y: 35 },
        { city: 'London', region: 'EU-West', x: 48, y: 30 },
        { city: 'Singapore', region: 'APAC-South', x: 82, y: 65 },
        { city: 'Hyderabad', region: 'IND-Central', x: 70, y: 55 }
    ];
}
