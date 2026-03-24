import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <h3 class="mono-font">Arbor Technologies</h3>
          <p>Next-generation cloud infrastructure orchestration. Built for 99.999% reliability.</p>
          <div class="social-links">
            <a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="https://github.com" target="_blank"><i class="fab fa-github"></i></a>
            <a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
        <div class="footer-links">
          <h4>Engineering</h4>
          <a href="#">Architecture</a>
          <a href="#">Observability</a>
          <a href="#">Automation</a>
        </div>
        <div class="footer-links">
          <h4>Organization</h4>
          <a routerLink="/services">Solutions</a>
          <a routerLink="/case-studies">Portfolio</a>
          <a routerLink="/contact">Briefing</a>
        </div>
        <div class="footer-links">
          <h4>Security</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Compliance</a>
        </div>
      </div>
      
      <div class="footer-status-bar">
        <div class="container status-flex">
          <div class="status-indicator">
            <span class="pulsate-dot"></span>
            <span class="status-text mono-font">Global Infrastructure: <span class="status-success">Operational</span></span>
          </div>
          <div class="footer-copyright">
            <p>&copy; 2026 Arbor Technologies. Currently in Stealth Mode.</p>
          </div>
        </div>
      </div>

      <!-- WhatsApp Floating Button -->
      <a href="https://wa.me/919121650564" class="whatsapp-float" target="_blank" title="Chat on WhatsApp">
        <i class="fab fa-whatsapp"></i>
      </a>
    </footer>
  `,
  styles: [`
    .footer { 
      background: var(--bg-secondary); 
      color: var(--text-muted); 
      padding: 6rem 0 0; 
      margin-top: auto; 
      border-top: 1px solid #f1f5f9;
      position: relative;
      overflow: hidden;
    }
    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--primary-gradient);
    }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; padding-bottom: 4rem; }
    .footer-brand h3 { color: var(--text-main); font-size: 1.5rem; margin-bottom: 1rem; }
    .footer-brand p { max-width: 300px; margin-bottom: 1.5rem; font-size: 0.95rem; }
    .footer-links h4 { color: var(--text-main); margin-bottom: 1.5rem; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
    .footer-links a { display: block; color: var(--text-muted); text-decoration: none; margin-bottom: 0.8rem; transition: all 0.2s; font-size: 0.95rem; }
    .footer-links a:hover { color: var(--primary-color); transform: translateX(5px); }
    
    .footer-status-bar {
      border-top: 1px solid #f1f5f9;
      background: #f8fafc;
      padding: 1.5rem 0;
    }
    .status-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .pulsate-dot {
      width: 10px;
      height: 10px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
      animation: pulsate 2s infinite;
    }
    @keyframes pulsate {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.4; }
      100% { transform: scale(1); opacity: 1; }
    }
    .status-text { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }
    .status-success { color: #10b981; font-weight: 700; }
    .footer-copyright { font-size: 0.85rem; color: var(--text-muted); }

    .social-links { display: flex; gap: 1rem; }
    .social-links a { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: white; border: 1px solid #e2e8f0; border-radius: 50%; color: var(--text-main); transition: all 0.3s; }
    .social-links a:hover { background: var(--primary-color); color: white; transform: translateY(-3px); border-color: var(--primary-color); }
    
    @media (max-width: 768px) { 
      .footer-grid { grid-template-columns: 1fr; gap: 2.5rem; }
      .status-flex { flex-direction: column; text-align: center; }
    }
  `]
})
export class FooterComponent { }

