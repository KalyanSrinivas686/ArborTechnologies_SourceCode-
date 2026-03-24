import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { WhoWeHelpComponent } from './components/who-we-help/who-we-help.component';
import { ServicesComponent } from './components/services/services';
import { WhyChooseComponent } from './components/why-choose/why-choose.component';
import { ProcessComponent } from './components/process/process.component';
import { CaseStudiesComponent } from './components/case-studies/case-studies';

import { BlogResourcesComponent } from './components/blog-resources/blog-resources.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { FreeOfferComponent } from './components/free-offer/free-offer.component';
import { ContactComponent } from './components/contact/contact';
import { RoiCalculatorComponent } from './components/roi-calculator/roi-calculator.component';
import { FaqComponent } from './components/faq/faq.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    WhoWeHelpComponent,
    ServicesComponent,
    WhyChooseComponent,
    ProcessComponent,
    CaseStudiesComponent,

    BlogResourcesComponent,
    TechStackComponent,
    FreeOfferComponent,
    ContactComponent,
    RoiCalculatorComponent,
    FaqComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  isMainPage(): boolean {
    return (this.router.url === '/' || this.router.url === '/home') && !this.router.url.includes('/sudasko');
  };

  ngOnInit() {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const header = document.querySelector('.header') as HTMLElement;
      if (header) {
        if (winScroll > 50) {
          header.style.padding = '8px 0';
          header.style.top = '10px';
          header.style.width = '98%';
        } else {
          header.style.padding = '12px 0';
          header.style.top = '80px';
          header.style.width = '95%';
        }
      }
    });
  }

  title = 'Arbor Technologies | Future-Ready Cloud & AI';
}
