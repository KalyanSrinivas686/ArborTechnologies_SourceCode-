import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentLogo = '/assets/logo.png';
  showTextFallback = false;
  isMenuOpen = false;

  onLogoError() {
    this.currentLogo = '/assets/logo.svg'; // Fallback to SVG if PNG fails
    this.showTextFallback = true;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
