import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-brand">
          <h3>Arbor Technologies</h3>
          <p>Innovating the future, one byte at a time.</p>
        </div>
        <div class="footer-links">
          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
          </div>
          <div>
            <h4>Services</h4>
            <a href="#">Cloud Solutions</a>
            <a href="#">DevOps</a>
            <a href="#">Consulting</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Arbor Technologies. All rights reserved.</p>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      background: #0f172a;
      padding: 4rem 2rem 2rem;
      color: #94a3b8;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 4rem;
      margin-bottom: 3rem;
    }
    .footer-brand h3 {
      color: white;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    h4 {
      color: white;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    a {
      display: block;
      color: #94a3b8;
      text-decoration: none;
      margin-bottom: 0.5rem;
      transition: color 0.2s;
    }
    a:hover {
      color: #3b82f6;
    }
    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
      }
      .footer-links {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent { }
