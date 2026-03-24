import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-sudasko',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './sudasko.html',
    styleUrl: './sudasko.css'
})
export class MealOpsComponent implements OnInit, OnDestroy {
    currentProfile = 'Kalyan Upadhayayula';
    currentBalance: number = 0;
    bankBalance: number = 0;
    selectedMethod: 'gpay' | 'phonepe' | 'mealops' = 'mealops';
    isScanning: boolean = false;
    showToast: boolean = false;
    lastTxMessage: string = '';
    private liveUpdateInterval: any;

    isPaymentMode = false;
    qrUrl = '';
    payAmount = 0;
    paymentStep: 'input' | 'processing' | 'success' = 'input';

    // Top-up State
    showTopUp = false;
    topUpAmount = 0;
    topUpStep: 'input' | 'processing' | 'success' = 'input';


    profiles = [
        {
            name: 'Kalyan Upadhayayula',
            balance: 2500.00,
            bankBalance: 50000.00,
            transactions: []
        },
        {
            name: 'Arbor Employee A',
            balance: 1500.00,
            bankBalance: 25000.00,
            transactions: []
        },
        {
            name: 'Arbor Manager',
            balance: 10000.00,
            bankBalance: 100000.00,
            transactions: []
        }
    ];

    transactions: any[] = [];
    merchants = [
        'Blue Tokai', 'Third Wave Coffee', 'Paradise Biryani', 'Swiggy', 'Zomato',
        'WeWork Space', 'Awfis Desk', 'Shell Transit', 'Uber Premier', 'Apollo Health',
        'Big Basket', 'Amazon Retail', 'Social Pub', 'Blinkit', 'Chai Point',
        'EatFit', 'Subway', 'Pizza Hut', 'Burger King', 'Cinepolis', 'Zara'
    ];

    opsCategories = [
        { name: 'Gourmet Dining', icon: 'fa-utensils', min: 350, max: 2500 },
        { name: 'Workspace Access', icon: 'fa-laptop-code', min: 499, max: 5000 },
        { name: 'Commute & Fuel', icon: 'fa-gas-pump', min: 100, max: 1500 },
        { name: 'Health & Wellness', icon: 'fa-heartbeat', min: 200, max: 3000 },
        { name: 'Retail & Lifestyle', icon: 'fa-shopping-bag', min: 500, max: 8000 },
        { name: 'Daily Essentials', icon: 'fa-shopping-basket', min: 50, max: 800 }
    ];

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.checkRoute();

        const params = new URLSearchParams(window.location.search);
        const userParam = params.get('user');
        if (userParam) {
            this.switchProfile(userParam);
        }

        this.qrUrl = window.location.origin + '/sudasko/pay?user=' + encodeURIComponent(this.currentProfile);
        this.loadState();
        // Background automation disabled to maintain real-time accuracy vs fake simulations
    }

    checkRoute() {
        if (window.location.pathname.includes('/sudasko/pay')) {
            this.isPaymentMode = true;
            // Also ensure we have a valid profile if switched via URL
            const params = new URLSearchParams(window.location.search);
            const user = params.get('user');
            if (user) this.currentProfile = user;
        } else {
            this.isPaymentMode = false;
        }
    }

    processUPIPayment() {
        if (this.payAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const balanceToUse = this.selectedMethod === 'mealops' ? this.currentBalance : this.bankBalance;

        // Strict check for Realism if using MealOps wallet
        // Bank check is looser but still enforced for logic (seeded high)
        if (balanceToUse < this.payAmount) {
            const sourceName = this.selectedMethod === 'mealops' ? 'MealOps Wallet' : 'Linked Bank Account';
            alert(`Payment Failed: Insufficient funds in ${sourceName}. Please add funds.`);
            return;
        }

        this.paymentStep = 'processing';
        this.cdr.detectChanges();

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setTimeout(() => {
            if (this.selectedMethod === 'mealops') {
                this.currentBalance = parseFloat((this.currentBalance - this.payAmount).toFixed(2));
            } else {
                this.bankBalance = parseFloat((this.bankBalance - this.payAmount).toFixed(2));
            }

            this.transactions.unshift({
                name: 'Merchant Pay',
                date: timestamp,
                amount: this.payAmount,
                icon: 'fa-store',
                type: 'debit',
                source: this.selectedMethod.toUpperCase(),
                utr: this.generateUTR()
            });

            if (this.transactions.length > 20) this.transactions.pop();

            this.paymentStep = 'success';
            this.saveState();
            this.cdr.detectChanges();
        }, 2000);
    }

    selectMethod(method: 'gpay' | 'phonepe' | 'mealops') {
        this.selectedMethod = method;
    }

    // Unified selection for Top-up too
    selectedTopUpApp: 'gpay' | 'phonepe' = 'gpay';
    setTopUpUPI(app: 'gpay' | 'phonepe') {
        this.selectedTopUpApp = app;
    }

    openTopUp() {
        this.showTopUp = true;
        this.topUpStep = 'input';
        this.topUpAmount = 0;
    }

    closeTopUp() {
        this.showTopUp = false;
    }

    executeTopUp() {
        if (this.topUpAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        this.topUpStep = 'processing';
        this.cdr.detectChanges();

        setTimeout(() => {
            this.bankBalance = parseFloat((this.bankBalance - this.topUpAmount).toFixed(2));
            this.currentBalance = parseFloat((this.currentBalance + this.topUpAmount).toFixed(2));

            this.transactions.unshift({
                name: 'Wallet Top-Up',
                date: 'Just Now',
                amount: this.topUpAmount,
                icon: 'fa-plus-circle',
                type: 'credit',
                source: 'BANK/UPI',
                utr: this.generateUTR()
            });

            if (this.transactions.length > 10) this.transactions.pop();

            this.topUpStep = 'success';
            this.triggerToast(`Added ₹${this.topUpAmount} to MealOps Wallet`);
            this.saveState();
            this.cdr.detectChanges();
        }, 2000);
    }


    ngOnDestroy() {
        if (this.liveUpdateInterval) {
            clearInterval(this.liveUpdateInterval);
        }
    }

    loadState() {
        // CHANGED KEY TO FORCE RESET (v3) - Final Clean State
        const saved = localStorage.getItem('mealops_poc_state_v3');
        if (saved) {
            const state = JSON.parse(saved);
            this.currentProfile = state.currentProfile;
            this.currentBalance = state.currentBalance || 0;
            this.bankBalance = state.bankBalance || 0;
            this.transactions = state.transactions || [];
        } else {
            this.resetToProfile(this.profiles[0]);
        }
    }

    saveState() {
        const state = {
            currentProfile: this.currentProfile,
            currentBalance: this.currentBalance,
            bankBalance: this.bankBalance,
            transactions: this.transactions
        };
        localStorage.setItem('mealops_poc_state_v3', JSON.stringify(state));
    }

    resetToProfile(profile: any) {
        this.currentProfile = profile.name;
        this.currentBalance = profile.balance;
        this.bankBalance = profile.bankBalance;
        this.transactions = [...profile.transactions];
        this.saveState();
    }

    switchProfile(profileName: string) {
        const profile = this.profiles.find(p => p.name === profileName);
        if (profile) {
            this.resetToProfile(profile);
        }
    }

    setSource(source: 'coupon' | 'upi') {
        // Compatibility for dashboard clicks
        this.selectedMethod = source === 'coupon' ? 'mealops' : 'gpay';
    }

    scanToPay() {
        this.isScanning = true;

        // Pick a random merchant and universal category for realism
        const merchant = this.merchants[Math.floor(Math.random() * this.merchants.length)];
        const category = this.opsCategories[Math.floor(Math.random() * this.opsCategories.length)];
        const paymentAmount = parseFloat((Math.random() * (category.max - category.min) + category.min).toFixed(2));

        const balanceToUse = this.selectedMethod === 'mealops' ? this.currentBalance : this.bankBalance;
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setTimeout(() => {
            // REALISM CHECK:
            // 1. MealOps Wallet: MUST have enough balance. Cannot go negative.
            // 2. Bank/Others: Can go through as long as Bank has funds (which we seeded with 50k)

            let canPay = false;
            if (this.selectedMethod === 'mealops') {
                canPay = this.currentBalance >= paymentAmount;
            } else {
                canPay = this.bankBalance >= paymentAmount;
            }

            if (canPay) {
                if (this.selectedMethod === 'mealops') {
                    this.currentBalance = parseFloat((this.currentBalance - paymentAmount).toFixed(2));
                } else {
                    this.bankBalance = parseFloat((this.bankBalance - paymentAmount).toFixed(2));
                }

                this.transactions.unshift({
                    name: merchant,
                    date: timestamp,
                    amount: paymentAmount,
                    icon: category.icon,
                    type: 'debit',
                    source: this.selectedMethod.toUpperCase(),
                    utr: this.generateUTR()
                });

                if (this.transactions.length > 20) this.transactions.pop();

                this.triggerToast(`Paid ₹${paymentAmount} to ${merchant} via ${this.selectedMethod.toUpperCase()}`);
                this.saveState();
            } else {
                // Determine balance to use for error message
                const available = this.selectedMethod === 'mealops' ? this.currentBalance : this.bankBalance;
                const sourceName = this.selectedMethod === 'mealops' ? 'MealOps Wallet' : 'Bank Account';
                alert(`Transaction Declined: Insufficient balance in ${sourceName}. Available: ₹${available}`);
            }

            this.isScanning = false;
            this.cdr.detectChanges();
        }, 1200);
    }

    private generateUTR() {
        return Math.floor(Math.random() * 900000000000 + 100000000000).toString();
    }

    private simulateBackgroundCredit() {
        // Disabled to ensure 100% balance accuracy and zero fakes
    }

    private triggerToast(message: string) {
        this.lastTxMessage = message;
        this.showToast = true;
        setTimeout(() => {
            this.showToast = false;
            this.cdr.detectChanges();
        }, 4000);
    }
}
