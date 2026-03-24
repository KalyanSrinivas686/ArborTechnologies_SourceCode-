import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  private particlesContainer: HTMLElement | null = null;

  ngOnInit() {
    this.initParticles();
  }

  ngOnDestroy() {
    // Clean up particles if needed
  }

  private initParticles() {
    this.particlesContainer = document.getElementById('hero-particles');
    if (!this.particlesContainer) return;

    // Create particles
    for (let i = 0; i < 50; i++) {
      this.createParticle();
    }
  }

  private createParticle() {
    if (!this.particlesContainer) return;

    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 8}s`;
    
    // Random animation duration
    particle.style.animationDuration = `${Math.random() * 3 + 5}s`;
    
    this.particlesContainer.appendChild(particle);
  }

  navigateToSection(sectionId: string, event?: Event) {
    event?.preventDefault();
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
