import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-solution-architect',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './solution-architect.html',
    styleUrl: './solution-architect.css'
})
export class SolutionArchitectComponent {
    step: number = 1;

    // Selection state
    industry: string = '';
    primaryGoal: string = '';
    currentInfrastructure: string = '';

    showRoadmap: boolean = false;

    industries = [
        { id: 'fintech', name: 'FinTech', icon: 'fa-solid fa-landmark' },
        { id: 'saas', name: 'B2B SaaS', icon: 'fa-solid fa-layer-group' },
        { id: 'ecommerce', name: 'E-Commerce', icon: 'fa-solid fa-cart-shopping' },
        { id: 'healthcare', name: 'HealthTech', icon: 'fa-solid fa-heart-pulse' }
    ];

    goals = [
        { id: 'cost', name: 'Reduce Cloud Costs', desc: 'Optimize spend by 30%+' },
        { id: 'speed', name: 'Faster Deployments', desc: 'Move from days to minutes' },
        { id: 'ai', name: 'AI Integration', desc: 'Deploy custom LLM solutions' },
        { id: 'scale', name: 'Infinite Scalability', desc: 'Handle 10x traffic spikes' }
    ];

    nextStep() {
        if (this.step < 3) this.step++;
        else {
            this.generateRoadmap();
        }
    }

    prevStep() {
        if (this.step > 1) this.step--;
    }

    selectIndustry(id: string) {
        this.industry = id;
        this.nextStep();
    }

    selectGoal(id: string) {
        this.primaryGoal = id;
        this.nextStep();
    }

    generateRoadmap() {
        this.showRoadmap = true;
    }

    reset() {
        this.step = 1;
        this.showRoadmap = false;
        this.industry = '';
        this.primaryGoal = '';
    }

    downloadRoadmap() {
        window.print();
    }
}
