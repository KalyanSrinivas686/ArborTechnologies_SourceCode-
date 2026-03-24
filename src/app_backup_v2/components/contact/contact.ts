import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {

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

  onSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    console.log('Form submitted:', Object.fromEntries(formData));

    this.showSuccessMessage();

    form.reset();
  }

  private showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>Thank you for your message! We'll get back to you soon.</span>
    `;

    const form = document.querySelector('.contact-form');
    if (form) {
      form.parentNode?.insertBefore(successDiv, form.nextSibling);

      setTimeout(() => {
        successDiv.remove();
      }, 5000);
    }
  }
}
