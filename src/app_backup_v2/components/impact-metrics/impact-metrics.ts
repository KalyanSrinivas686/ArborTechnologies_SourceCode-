import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-impact-metrics',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './impact-metrics.html',
    styleUrl: './impact-metrics.css'
})
export class ImpactMetricsComponent {
    metrics = [
        { label: 'Avg. Cloud Savings', value: 40, suffix: '%', icon: 'fa-solid fa-piggy-bank' },
        { label: 'Deployments / Month', value: 12500, suffix: '+', icon: 'fa-solid fa-code-branch' },
        { label: 'Uptime Reliability', value: 99.9, suffix: '%', icon: 'fa-solid fa-up-right-from-square' },
        { label: 'Threats Blocked', value: 1, suffix: 'M+', icon: 'fa-solid fa-shield-virus' }
    ];

    displayValues: number[] = [0, 0, 0, 0];
    animated = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    startCount() {
        if (this.animated) return;
        this.animated = true;

        this.metrics.forEach((m, i) => {
            const duration = 2000;
            const steps = 60;
            const increment = m.value / steps;
            let current = 0;
            const interval = setInterval(() => {
                current += increment;
                if (current >= m.value) {
                    this.displayValues[i] = m.value;
                    clearInterval(interval);
                } else {
                    this.displayValues[i] = Math.floor(current);
                }
            }, duration / steps);
        });
    }
}
