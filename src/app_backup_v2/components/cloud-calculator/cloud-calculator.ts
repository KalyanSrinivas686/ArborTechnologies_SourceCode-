import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cloud-calculator',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './cloud-calculator.html',
    styleUrl: './cloud-calculator.css'
})
export class CloudCalculatorComponent {
    monthlySpend: number = 5000;
    complexity: number = 1; // 1: Low, 2: Medium, 3: High
    automationLevel: number = 0; // 0% to 100%

    calculateSavings(): number {
        // Basic logic: base 20% savings + complexity factor + automation potential
        const baseSavingsRate = 0.20;
        const complexityFactor = this.complexity * 0.05;
        const automationFactor = (1 - (this.automationLevel / 100)) * 0.15;

        return Math.floor(this.monthlySpend * (baseSavingsRate + complexityFactor + automationFactor));
    }

    getEfficiencyScore(): string {
        const savingsRatio = this.calculateSavings() / this.monthlySpend;
        if (savingsRatio > 0.35) return 'High Optimization Potential';
        if (savingsRatio > 0.25) return 'Medium Optimization Potential';
        return 'Optimized';
    }
}
