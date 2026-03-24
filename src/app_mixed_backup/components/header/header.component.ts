import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container navbar">
        <a routerLink="/" class="logo flex-center">
            <!-- Tries to load user's logo.png first -->
            <img [src]="currentLogo" alt="Arbor Technologies" class="logo-img" (error)="onLogoError()">
            
            <!-- Shows text only if both logo.png and logo.svg fail (unlikely) or during loading flicker -->
            <span *ngIf="showTextFallback" class="logo-text">ARBOR <span class="gradient-text">TECHNOLOGIES</span></span>
        </a>
        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/services" routerLinkActive="active">Services</a>
          <a routerLink="/case-studies" routerLinkActive="active">Case Studies</a>
          <a routerLink="/contact" routerLinkActive="active" class="btn-primary">Contact Us</a>
        </nav>
        <button class="mobile-menu-btn">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 80px;
      padding: 0 2rem;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(12px);
      z-index: 1000;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
    }
    
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .flex-center {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .logo-img {
      height: 48px;
      width: auto;
      object-fit: contain;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      text-decoration: none;
    }
    
    .logo-text span {
      font-weight: 300;
      color: #0ea5e9;
    }

    .gradient-text {
      background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }
    
    .nav-links a {
      color: #475569;
      text-decoration: none;
      font-weight: 500;
      font-family: 'Outfit', sans-serif;
      transition: color 0.3s ease;
    }
    
    .nav-links a:hover, .nav-links a.active {
      color: #0ea5e9;
      font-weight: 600;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
      color: white !important;
      padding: 0.6rem 1.8rem;
      border-radius: 9999px;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(14, 165, 233, 0.2);
    }
    
    .btn-primary:hover {
      opacity: 0.9;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(14, 165, 233, 0.3);
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: #0f172a;
      font-size: 1.5rem;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      .mobile-menu-btn {
        display: block;
      }
    }
  `]
})
export class HeaderComponent {
  currentLogo = 'assets/logo.png'; // Try user's logo first
  showTextFallback = false;

  onLogoError() {
    if (this.currentLogo === 'assets/logo.png') {
      // If png fails, try the svg placeholder
      this.currentLogo = 'assets/logo.svg';
    } else {
      // If both fail, hide image and show text
      this.showTextFallback = true;
    }
  }
}
