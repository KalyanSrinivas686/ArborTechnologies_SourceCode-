import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-architecture-duel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './architecture-duel.html',
    styleUrl: './architecture-duel.css'
})
export class ArchitectureDuelComponent {
    activeMode: 'serverless' | 'kubernetes' = 'serverless';

    serverless = {
        title: 'Serverless Intelligence',
        subtitle: 'Event-Driven & Auto-Scaled',
        stats: { cost: 95, speed: 85, complexity: 20 },
        infra: ['AWS Lambda', 'DynamoDB', 'API Gateway', 'S3 Edge'],
        pros: ['Zero Idle Cost', 'Infinite Scaling', 'Developer Focus']
    };

    kubernetes = {
        title: 'Kubernetes Orchestration',
        subtitle: 'Containerized & Highly Controlled',
        stats: { cost: 70, speed: 95, complexity: 90 },
        infra: ['EKS/GKE Cluster', 'PostgreSQL', 'Ingress Nginx', 'Redis Cache'],
        pros: ['Total Control', 'Cloud Agnostic', 'Stateful Support']
    };

    setMode(mode: 'serverless' | 'kubernetes') {
        this.activeMode = mode;
    }
}
