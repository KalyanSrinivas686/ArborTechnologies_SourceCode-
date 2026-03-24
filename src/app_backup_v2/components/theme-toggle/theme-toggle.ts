import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button class="theme-toggle-btn magnetic-btn-2" (click)="toggleTheme()" [title]="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
      <i [class]="isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
    </button>
  `,
  standalone: true,
  styles: [`
    .theme-toggle-btn {
      position: fixed;
      top: 50%;
      right: 2rem;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--gradient-primary);
      border: none;
      color: white;
      cursor: pointer;
      box-shadow: var(--shadow-lg);
      transition: all 0.3s ease;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .theme-toggle-btn:hover {
      transform: translateY(-50%) scale(1.1) rotate(180deg);
      box-shadow: 0 10px 30px rgba(0, 102, 204, 0.4);
    }

    @media (max-width: 768px) {
      .theme-toggle-btn {
        top: auto;
        bottom: 2rem;
        right: 1rem;
        transform: none;
      }

      .theme-toggle-btn:hover {
        transform: scale(1.1) rotate(180deg);
      }
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.enableDarkMode();
    }
  }

  toggleTheme() {
    if (this.isDarkMode) {
      this.enableLightMode();
    } else {
      this.enableDarkMode();
    }
  }

  private enableDarkMode() {
    this.isDarkMode = true;
    this.renderer.addClass(document.body, 'dark-theme');
    this.renderer.addClass(document.body, 'theme-transition');
    localStorage.setItem('theme', 'dark');
    
    // Remove transition class after animation
    setTimeout(() => {
      this.renderer.removeClass(document.body, 'theme-transition');
    }, 300);
  }

  private enableLightMode() {
    this.isDarkMode = false;
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.addClass(document.body, 'theme-transition');
    localStorage.setItem('theme', 'light');
    
    // Remove transition class after animation
    setTimeout(() => {
      this.renderer.removeClass(document.body, 'theme-transition');
    }, 300);
  }
}
