import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-roi-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule, DecimalPipe],
  templateUrl: './roi-calculator.component.html',
  styleUrl: './roi-calculator.component.css'
})
export class RoiCalculatorComponent {
  monthlySpend: number = 50000;
  teamSize: number = 1;
  downtimeHours: number = 4;
  monthlySavings: number = 0;
  revenueProtection: number = 0;
  annualRoi: number = 0;

  calculateROI() {
    // Calculate savings (30-50% cost optimization)
    const costSavings = this.monthlySpend * 0.4; // 40% average savings
    
    // Calculate revenue protection (assuming ₹10,000 per hour of downtime)
    const hourlyRevenue = 10000;
    const revenueProtection = this.downtimeHours * hourlyRevenue * 0.95; // 95% prevention
    
    // Calculate team cost savings
    const teamCostPerMonth = this.teamSize * 80000; // ₹80,000 average per engineer
    const teamSavings = teamCostPerMonth * 0.5; // 50% efficiency gain
    
    // Total monthly savings
    const totalMonthlySavings = costSavings + revenueProtection + teamSavings;
    
    // Calculate annual ROI
    const annualSavings = totalMonthlySavings * 12;
    const investment = 49999; // DevOps setup cost
    const roi = ((annualSavings - investment) / investment * 100);
    
    // Update results
    this.monthlySavings = totalMonthlySavings;
    this.revenueProtection = revenueProtection;
    this.annualRoi = roi;
  }

  onInputChange() {
    this.calculateROI();
  }

  ngOnInit() {
    this.calculateROI();
  }
}
