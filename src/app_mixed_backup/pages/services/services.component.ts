import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="section">
      <div class="container">
        <h1>Our Services</h1>
        <p>Comprehensive cloud solutions coming soon.</p>
      </div>
    </section>
  `,
    styles: [`
    .section { padding: 8rem 0; min-height: 80vh; color: white; }
  `]
})
export class ServicesComponent { }
