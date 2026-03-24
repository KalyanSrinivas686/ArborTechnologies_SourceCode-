import { Component, OnInit, OnDestroy, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-interactive-effects',
  template: '',
  standalone: true
})
export class InteractiveEffectsComponent implements OnInit, OnDestroy {
  private cursor: HTMLElement | null = null;
  private cursorDot: HTMLElement | null = null;
  private scrollProgress: HTMLElement | null = null;
  private trails: HTMLElement[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private currentX = 0;
  private currentY = 0;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.createCustomCursor();
    this.createScrollProgress();
    this.initMagneticEffects();
    this.initScrollAnimations();
  }

  ngOnDestroy() {
    this.removeCursor();
    this.removeScrollProgress();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    
    if (this.cursor && this.cursorDot) {
      this.cursor.style.left = `${event.clientX}px`;
      this.cursor.style.top = `${event.clientY}px`;
      this.cursorDot.style.left = `${event.clientX}px`;
      this.cursorDot.style.top = `${event.clientY}px`;
    }
    
    this.createTrail(event.clientX, event.clientY);
  }

  @HostListener('scroll')
  onScroll() {
    if (this.scrollProgress) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      this.scrollProgress.style.width = `${scrolled}%`;
    }
  }

  private createCustomCursor() {
    // Only create custom cursor on desktop
    if (window.innerWidth > 768) {
      // Main cursor
      this.cursor = this.renderer.createElement('div');
      this.renderer.addClass(this.cursor, 'custom-cursor');
      this.renderer.appendChild(document.body, this.cursor);

      // Cursor dot
      this.cursorDot = this.renderer.createElement('div');
      this.renderer.addClass(this.cursorDot, 'custom-cursor-dot');
      this.renderer.appendChild(document.body, this.cursorDot);

      // Hide default cursor
      this.renderer.setStyle(document.body, 'cursor', 'none');
    }
  }

  private createTrail(x: number, y: number) {
    if (window.innerWidth <= 768) return; // Disable on mobile

    const trail = this.renderer.createElement('div');
    this.renderer.addClass(trail, 'cursor-trail');
    this.renderer.setStyle(trail, 'left', `${x}px`);
    this.renderer.setStyle(trail, 'top', `${y}px`);
    this.renderer.appendChild(document.body, trail);

    this.trails.push(trail);

    // Remove trail after animation
    setTimeout(() => {
      this.renderer.removeChild(document.body, trail);
      const index = this.trails.indexOf(trail);
      if (index > -1) {
        this.trails.splice(index, 1);
      }
    }, 1000);
  }

  private createScrollProgress() {
    this.scrollProgress = this.renderer.createElement('div');
    this.renderer.addClass(this.scrollProgress, 'scroll-progress');
    this.renderer.appendChild(document.body, this.scrollProgress);
  }

  private initMagneticEffects() {
    const magneticElements = document.querySelectorAll('.magnetic-element, .magnetic-btn-2');
    
    magneticElements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        this.renderer.addClass(element, 'magnetic-active');
      });

      element.addEventListener('mouseleave', () => {
        this.renderer.removeClass(element, 'magnetic-active');
        this.renderer.setStyle(element, 'transform', 'translate(0, 0)');
      });

      element.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = element.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.3;
        const moveY = y * 0.3;
        
        this.renderer.setStyle(element, 'transform', `translate(${moveX}px, ${moveY}px)`);
      });
    });
  }

  private initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'visible');
          
          // Trigger split text animation
          if (entry.target.classList.contains('split-text')) {
            this.animateSplitText(entry.target);
          }
          
          // Trigger typewriter effect
          if (entry.target.classList.contains('typewriter')) {
            this.animateTypewriter(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
      '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .split-text, .typewriter'
    );
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  private animateSplitText(element: Element) {
    const text = element.textContent || '';
    element.textContent = '';
    
    text.split('').forEach((char, index) => {
      const span = this.renderer.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      this.renderer.setStyle(span, 'transition-delay', `${index * 0.05}s`);
      this.renderer.appendChild(element, span);
    });
    
    setTimeout(() => {
      this.renderer.addClass(element, 'animate');
    }, 100);
  }

  private animateTypewriter(element: Element) {
    const text = element.textContent || '';
    element.textContent = '';
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }

  private removeCursor() {
    if (this.cursor) {
      this.renderer.removeChild(document.body, this.cursor);
    }
    if (this.cursorDot) {
      this.renderer.removeChild(document.body, this.cursorDot);
    }
    this.renderer.setStyle(document.body, 'cursor', 'auto');
  }

  private removeScrollProgress() {
    if (this.scrollProgress) {
      this.renderer.removeChild(document.body, this.scrollProgress);
    }
  }
}
