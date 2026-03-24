import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-logo-carousel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './logo-carousel.html',
    styleUrl: './logo-carousel.css'
})
export class LogoCarouselComponent {
    logos = [
        { name: 'AWS', icon: 'fa-brands fa-aws' },
        { name: 'Azure', icon: 'fa-solid fa-cloud' },
        { name: 'Google Cloud', icon: 'fa-brands fa-google' },
        { name: 'Docker', icon: 'fa-brands fa-docker' },
        { name: 'Kubernetes', icon: 'fa-solid fa-dharmachakra' },
        { name: 'Terraform', icon: 'fa-solid fa-cubes' },
        { name: 'Python', icon: 'fa-brands fa-python' },
        { name: 'GitHub', icon: 'fa-brands fa-github' },
        { name: 'Jenkins', icon: 'fa-brands fa-jenkins' }
    ];
}
