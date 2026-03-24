import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewsletterService } from '../../services/newsletter.service';

@Component({
    selector: 'app-newsletter',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './newsletter.html',
    styleUrl: './newsletter.css'
})
export class NewsletterComponent {
    email: string = '';
    subscribed: boolean = false;
    isSubmitting: boolean = false;

    constructor(private newsletterService: NewsletterService) { }

    onSubmit() {
        if (this.email) {
            this.isSubmitting = true;
            this.newsletterService.subscribe(this.email).subscribe({
                next: () => {
                    this.subscribed = true;
                    this.email = '';
                    this.isSubmitting = false;
                    setTimeout(() => this.subscribed = false, 5000);
                },
                error: () => {
                    this.isSubmitting = false;
                    // For a real app, you'd show an error message
                }
            });
        }
    }
}
