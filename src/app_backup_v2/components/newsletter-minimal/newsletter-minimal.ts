import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-newsletter-minimal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './newsletter-minimal.html',
    styleUrl: './newsletter-minimal.css'
})
export class NewsletterMinimalComponent {
    email: string = '';
    subscribed: boolean = false;

    subscribe() {
        if (this.email) {
            this.subscribed = true;
            console.log('Subscribed:', this.email);
        }
    }
}
