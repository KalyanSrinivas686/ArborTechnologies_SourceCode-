import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-faq',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './faq.html',
    styleUrl: './faq.css'
})
export class FAQComponent {
    searchQuery = '';

    faqs = [
        {
            q: 'How long does a typical migration take?',
            a: 'Depending on complexity, foundation builds take 4-6 weeks, with full production scaling across 3-6 months.',
            open: false,
            category: 'Process'
        },
        {
            q: 'Can you work with our existing DevOps team?',
            a: 'Yes. We specialize in "Augmented Intelligence" where we integrate our SmartOps tools with your internal workflows.',
            open: false,
            category: 'Partnership'
        },
        {
            q: 'Do you provide 24/7 post-launch support?',
            a: 'Absolutely. Our "AI Core" monitors systems continuously, and our site reliability team is on standby for critical events.',
            open: false,
            category: 'Support'
        },
        {
            q: 'How do you handle data privacy in AI models?',
            a: 'We deploy private, siloed LLMs within your own cloud VPC (AWS/Azure). Your data NEVER leaves your secure environment.',
            open: false,
            category: 'Security'
        },
        {
            q: 'Is MealOps available for external companies?',
            a: 'Yes, while originally built for internal use, MealOps is now part of our Intelligence Suite and can be deployed for your organization.',
            open: false,
            category: 'Product'
        }
    ];

    get filteredFaqs() {
        return this.faqs.filter(f =>
            f.q.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            f.category.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    toggle(faq: any) {
        faq.open = !faq.open;
    }
}
