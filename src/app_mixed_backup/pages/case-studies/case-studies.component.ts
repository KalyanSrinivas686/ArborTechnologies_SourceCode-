import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-case-studies',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="section">
      <div class="container">
        <h1>Case Studies</h1>
        <p>Explore our success stories.</p>
      </div>
    </section>
  `,
    styles: [`
    .section { padding: 8rem 0; min-height: 80vh; color: white; }
  `]
})
export class CaseStudiesComponent { }
