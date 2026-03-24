import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="section">
      <div class="container">
        <h1>Contact Us</h1>
        <p>Get in touch with our team.</p>
      </div>
    </section>
  `,
    styles: [`
    .section { padding: 8rem 0; min-height: 80vh; color: white; }
  `]
})
export class ContactComponent { }
