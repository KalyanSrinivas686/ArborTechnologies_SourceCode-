import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
  last_updated: Date;
}

@Component({
  selector: 'app-realtime-crypto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realtime-crypto.html',
  styleUrl: './realtime-crypto.css'
})
export class RealtimeCryptoComponent implements OnInit, OnDestroy {
  cryptoPrices: CryptoPrice[] = [];
  loading = true;
  error: string | null = null;
  lastUpdate: Date | null = null;
  private updateInterval: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCryptoPrices();
    // Update every 10 seconds (CoinGecko free tier allows this)
    this.updateInterval = setInterval(() => {
      this.fetchCryptoPrices();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  fetchCryptoPrices() {
    // Using CoinGecko API - free, no API key required
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h';
    
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.cryptoPrices = data.map(coin => ({
          id: coin.id,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h || 0,
          market_cap: coin.market_cap,
          image: coin.image,
          last_updated: new Date(coin.last_updated)
        }));
        this.lastUpdate = new Date();
        this.loading = false;
        this.error = null;
      },
      error: (err) => {
        this.error = 'Unable to fetch real-time crypto prices. Please try again later.';
        this.loading = false;
        console.error('Crypto API Error:', err);
      }
    });
  }

  formatPrice(price: number): string {
    if (price < 0.01) {
      return '$' + price.toFixed(6);
    } else if (price < 1) {
      return '$' + price.toFixed(4);
    } else {
      return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }

  formatMarketCap(marketCap: number): string {
    if (marketCap >= 1e12) {
      return '$' + (marketCap / 1e12).toFixed(2) + 'T';
    } else if (marketCap >= 1e9) {
      return '$' + (marketCap / 1e9).toFixed(2) + 'B';
    } else if (marketCap >= 1e6) {
      return '$' + (marketCap / 1e6).toFixed(2) + 'M';
    }
    return '$' + marketCap.toLocaleString();
  }

  getChangeColor(change: number): string {
    if (change > 0) return '#10b981';
    if (change < 0) return '#ef4444';
    return '#6b7280';
  }
}
