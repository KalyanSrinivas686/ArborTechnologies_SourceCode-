import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quick-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quick-quote.html',
  styleUrl: './quick-quote.css'
})
export class QuickQuoteComponent {
  showModal = false;
  quoteData = {
    service: '',
    companySize: '',
    timeline: '',
    budget: '',
    email: '',
    phone: ''
  };

  services = [
    'Cloud Migration',
    'DevOps Setup',
    'AI/ML Implementation',
    'Infrastructure Management',
    'Security Audit',
    'Custom Development'
  ];

  companySizes = [
    'Startup (1-10 employees)',
    'Small Business (11-50 employees)',
    'Medium Business (51-200 employees)',
    'Enterprise (200+ employees)'
  ];

  timelines = [
    'Immediate (within 1 month)',
    'Short-term (1-3 months)',
    'Medium-term (3-6 months)',
    'Long-term (6+ months)'
  ];

  openModal() {
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    document.body.style.overflow = '';
  }

  submitQuote() {
    if (!this.quoteData.service || !this.quoteData.email) {
      alert('Please fill in required fields');
      return;
    }

    // Format message for WhatsApp
    const message = `Quick Quote Request:
    
Service: ${this.quoteData.service}
Company Size: ${this.quoteData.companySize || 'Not specified'}
Timeline: ${this.quoteData.timeline || 'Not specified'}
Budget: ${this.quoteData.budget || 'Not specified'}
Email: ${this.quoteData.email}
Phone: ${this.quoteData.phone || 'Not provided'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919121650564?text=${encodedMessage}`, '_blank');
    
    this.closeModal();
    this.resetForm();
  }

  resetForm() {
    this.quoteData = {
      service: '',
      companySize: '',
      timeline: '',
      budget: '',
      email: '',
      phone: ''
    };
  }
}
