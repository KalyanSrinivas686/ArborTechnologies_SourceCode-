import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqItems = [
    {
      question: 'How quickly can you start working on our project?',
      answer: 'We can start within 48 hours after the initial consultation. Our team maintains a flexible schedule to accommodate urgent client needs and typically begins with infrastructure assessment within the first week.',
      isOpen: false
    },
    {
      question: 'What cloud platforms do you support?',
      answer: 'We specialize in AWS and Azure, with expertise in Google Cloud Platform as well. Our team holds certifications across all major cloud providers and can work with hybrid or multi-cloud environments.',
      isOpen: false
    },
    {
      question: 'Do you provide ongoing support after project completion?',
      answer: 'Yes! We offer 24/7 managed services, proactive monitoring, and ongoing optimization. Our support packages include regular health checks, security updates, and performance tuning to ensure your infrastructure continues to perform optimally.',
      isOpen: false
    },
    {
      question: 'What kind of cost savings can we expect?',
      answer: 'Our clients typically see 30-50% reduction in cloud costs through resource optimization, reserved instance planning, and architectural improvements. The free health check will provide you with a detailed cost analysis and savings potential.',
      isOpen: false
    },
    {
      question: 'How do you ensure security and compliance?',
      answer: 'We implement enterprise-grade security including encryption, access management, regular security audits, and compliance frameworks (SOC 2, ISO 27001, GDPR). Our team stays updated with latest security best practices and threat intelligence.',
      isOpen: false
    },
    {
      question: 'What industries do you serve?',
      answer: 'We work with SaaS companies, e-commerce platforms, fintech startups, healthcare technology, and digital media companies. Our expertise spans various industries requiring high availability, scalability, and security.',
      isOpen: false
    }
  ];

  toggleFAQ(index: number) {
    // Close all other items
    this.faqItems.forEach((item, i) => {
      if (i !== index) {
        item.isOpen = false;
      }
    });
    
    // Toggle current item
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
