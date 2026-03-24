import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero-particles',
  template: '',
  standalone: true
})
export class HeroParticlesComponent implements OnInit, OnDestroy {
  private particlesContainer: HTMLElement | null = null;
  private animationFrameId: number | null = null;

  ngOnInit() {
    this.initParticles();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
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
}
