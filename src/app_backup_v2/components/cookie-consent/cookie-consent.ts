import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cookie-consent',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cookie-consent.html',
    styleUrl: './cookie-consent.css'
})
export class CookieConsentComponent implements OnInit {
    isVisible = false;

    ngOnInit() {
        const consent = localStorage.getItem('arbor-tech-cookie-consent');
        if (!consent) {
            setTimeout(() => this.isVisible = true, 3000);
        }
    }

    accept() {
        localStorage.setItem('arbor-tech-cookie-consent', 'true');
        this.isVisible = false;
    }
}
