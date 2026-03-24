import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CaseStudy {
    id: string;
    title: string;
    subtitle: string;
    overview: string;
    problemStatement: string[];
    solutionDelivered: string[];
    architecture: { label: string; value: string }[];
    businessImpact: string[];
    demonstrates: string[];
    theme: 'food' | 'cloud';
}

@Component({
    selector: 'app-case-studies',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './case-studies.html',
    styleUrl: './case-studies.css'
})
export class CaseStudiesComponent {
    cases: CaseStudy[] = [
        {
            id: 'food-coupon',
            title: 'Enterprise Food Coupon Platform',
            subtitle: 'Cloud-Native Digital Wallet & QR-Based Meal Management System',
            overview: 'Arbor Technologies designed a modern digital food coupon platform to replace traditional paper-based voucher systems. The solution enables secure food credit allocation, real-time transaction tracking, and QR-based vendor redemption using cloud-native infrastructure.',
            problemStatement: [
                'Coupon misuse and duplication',
                'No real-time usage visibility',
                'Manual vendor reconciliation',
                'High administrative overhead',
                'Poor audit traceability'
            ],
            solutionDelivered: [
                'Employee food credit wallets',
                'QR-code based redemption system',
                'Vendor transaction processing dashboard',
                'Admin portal for allocation and reporting',
                'Secure authentication and role-based access'
            ],
            architecture: [
                { label: 'Frontend', value: 'Angular' },
                { label: 'Backend', value: 'Node.js (REST APIs)' },
                { label: 'Database', value: 'PostgreSQL' },
                { label: 'Cloud Platform', value: 'AWS EC2' },
                { label: 'CI/CD Pipeline', value: 'Jenkins' },
                { label: 'Monitoring', value: 'AWS CloudWatch' }
            ],
            businessImpact: [
                'Reduced manual processing efforts',
                'Improved transaction transparency',
                'Faster vendor settlement cycles',
                'Better employee experience',
                'Real-time reporting visibility'
            ],
            demonstrates: [
                'Build enterprise-grade business platforms',
                'Automate operational workflows',
                'Design scalable cloud systems',
                'Implement secure DevOps pipelines'
            ],
            theme: 'food'
        },
        {
            id: 'smart-ops',
            title: 'SmartOps Platform',
            subtitle: 'Real-Time Cloud Infrastructure Monitoring & Observability System',
            overview: 'SmartOps is a real-time monitoring platform developed by Arbor Technologies to provide centralized visibility into cloud system performance and infrastructure health. It enables teams to proactively manage reliability and reduce operational risk.',
            problemStatement: [
                'Limited real-time infrastructure visibility',
                'Reactive incident management',
                'Manual troubleshooting processes',
                'Fragmented monitoring tools',
                'Downtime-related business impact'
            ],
            solutionDelivered: [
                'Live CPU, memory, and disk utilization tracking',
                'Application health monitoring',
                'Threshold-based alerting system',
                'Centralized operational dashboard',
                'Historical performance analytics'
            ],
            architecture: [
                { label: 'Frontend', value: 'Angular' },
                { label: 'Backend', value: 'Node.js' },
                { label: 'Monitoring Integration', value: 'AWS CloudWatch' },
                { label: 'Deployment', value: 'Docker + AWS EC2' },
                { label: 'CI/CD Automation', value: 'Jenkins' }
            ],
            businessImpact: [
                'Faster issue detection',
                'Improved infrastructure reliability',
                'Reduced downtime risk',
                'Centralized operational visibility',
                'Proactive alert-driven operations'
            ],
            demonstrates: [
                'DevOps automation',
                'Cloud observability solutions',
                'Production deployment pipelines',
                'Scalable system architecture'
            ],
            theme: 'cloud'
        },
        {
            id: 'ecommerce-platform',
            title: 'E-commerce Platform Auto-Scaling',
            subtitle: 'Cloud-Native Infrastructure for Seasonal Traffic Spikes',
            overview: 'Arbor Technologies is implementing a scalable e-commerce infrastructure to handle 10x traffic during peak shopping seasons while maintaining 99.9% uptime and optimal performance.',
            problemStatement: [
                'Frequent crashes during flash sales',
                'Slow page loads impacting conversion rates',
                'Manual scaling causing delays',
                'High cloud costs due to over-provisioning',
                'Poor mobile performance during traffic spikes'
            ],
            solutionDelivered: [
                'Auto-scaling Kubernetes clusters',
                'CDN integration for static assets',
                'Database read replicas for load distribution',
                'Redis caching layer for session management',
                'Real-time traffic monitoring and alerts'
            ],
            architecture: [
                { label: 'Frontend', value: 'React + Next.js' },
                { label: 'Backend', value: 'Node.js + Express' },
                { label: 'Database', value: 'PostgreSQL + Redis' },
                { label: 'Container Platform', value: 'Kubernetes' },
                { label: 'Cloud Provider', value: 'AWS EKS' }
            ],
            businessImpact: [
                '10x traffic handling capability',
                '99.9% uptime during peak seasons',
                '40% reduction in cloud costs',
                '2x faster page load times',
                'Zero manual intervention during sales'
            ],
            demonstrates: [
                'Kubernetes orchestration',
                'Auto-scaling strategies',
                'Performance optimization',
                'Cost-efficient cloud architecture'
            ],
            theme: 'cloud'
        },
        {
            id: 'fintech-api',
            title: 'FinTech API Gateway & Security',
            subtitle: 'Secure Microservices Architecture for Financial Services',
            overview: 'Building a secure API gateway and microservices infrastructure for a fintech startup processing 1M+ transactions daily with bank-level security compliance.',
            problemStatement: [
                'Monolithic architecture causing bottlenecks',
                'Security compliance challenges (PCI DSS)',
                'Slow API response times affecting partners',
                'Difficult to implement new features',
                'Limited scalability for transaction volume'
            ],
            solutionDelivered: [
                'Microservices architecture with API Gateway',
                'OAuth 2.0 + JWT authentication system',
                'Rate limiting and DDoS protection',
                'Event-driven architecture with message queues',
                'Automated security scanning pipeline'
            ],
            architecture: [
                { label: 'API Gateway', value: 'Kong + OAuth2' },
                { label: 'Microservices', value: 'Node.js + Docker' },
                { label: 'Message Queue', value: 'RabbitMQ' },
                { label: 'Database', value: 'PostgreSQL Cluster' },
                { label: 'Security', value: 'Vault + SSL/TLS' }
            ],
            businessImpact: [
                '1M+ daily transaction processing',
                '99.99% API uptime SLA',
                'PCI DSS compliance achieved',
                '50% faster API response times',
                'Easy feature deployment without downtime'
            ],
            demonstrates: [
                'Microservices architecture',
                'Financial security compliance',
                'API gateway implementation',
                'High-availability systems'
            ],
            theme: 'cloud'
        }
    ];

    downloadDiagram(caseId: string): void {
        const imageName = caseId === 'food-coupon' ? 'infrastructure.png' : 
                          caseId === 'smartops' ? 'cloud.png' : 
                          caseId === 'ecommerce-platform' ? 'devops.png' : 
                          caseId === 'fintech-api' ? 'ai.png' : 'infrastructure.png';
        const link = document.createElement('a');
        link.href = `images/${imageName}`;
        link.download = `architecture-${caseId}.png`;
        link.click();
    }
}
