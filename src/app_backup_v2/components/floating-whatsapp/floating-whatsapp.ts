import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-whatsapp.html',
  styleUrl: './floating-whatsapp.css'
})
export class FloatingWhatsappComponent {
  isExpanded = false;
  phoneNumber = '919121650564';

  toggleChat() {
    this.isExpanded = !this.isExpanded;
  }

  openWhatsApp(message: string = 'Hi, I\'m interested in your services') {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${this.phoneNumber}?text=${encodedMessage}`, '_blank');
  }
}
