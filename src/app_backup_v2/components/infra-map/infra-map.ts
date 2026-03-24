import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-infra-map',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './infra-map.html',
    styleUrl: './infra-map.css'
})
export class InfraMapComponent {
    regions = [
        { name: 'North America', status: 'Optimal', delay: '12ms', x: '15%', y: '25%' },
        { name: 'Europe Hub', status: 'Optimal', delay: '16ms', x: '45%', y: '20%' },
        { name: 'APAC South', status: 'Optimal', delay: '22ms', x: '75%', y: '55%' },
        { name: 'EMEA East', status: 'Maintenance', delay: '45ms', x: '55%', y: '40%' }
    ];
}
