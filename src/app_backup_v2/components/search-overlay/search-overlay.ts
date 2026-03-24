import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search-overlay',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './search-overlay.html',
    styleUrl: './search-overlay.css'
})
export class SearchOverlayComponent {
    isOpen = false;
    searchQuery = '';
    results = [
        { title: 'Infrastructure Audit', category: 'Services', link: '#services' },
        { title: 'AI Model Deployment', category: 'Products', link: '#product-suite' },
        { title: 'Kubernetes Scaling', category: 'Workflow', link: '#methodology' },
        { title: 'FinTech Compliance', category: 'Verticals', link: '#sectors' }
    ];

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
            event.preventDefault();
            this.toggleSearch();
        }
        if (event.key === 'Escape' && this.isOpen) {
            this.closeSearch();
        }
    }

    toggleSearch() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            setTimeout(() => {
                document.getElementById('spotlight-input')?.focus();
            }, 100);
        }
    }

    closeSearch() {
        this.isOpen = false;
        this.searchQuery = '';
    }
}
