import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface ApiEndpoint {
  name: string;
  url: string;
  status: 'checking' | 'online' | 'offline' | 'slow';
  responseTime: number;
  lastChecked: Date | null;
  statusCode: number | null;
  error: string | null;
}

@Component({
  selector: 'app-realtime-api-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realtime-api-health.html',
  styleUrl: './realtime-api-health.css'
})
export class RealtimeApiHealthComponent implements OnInit, OnDestroy {
  endpoints: ApiEndpoint[] = [
    { name: 'Google API', url: 'https://www.google.com', status: 'checking', responseTime: 0, lastChecked: null, statusCode: null, error: null },
    { name: 'GitHub API', url: 'https://api.github.com', status: 'checking', responseTime: 0, lastChecked: null, statusCode: null, error: null },
    { name: 'CoinGecko API', url: 'https://api.coingecko.com/api/v3/ping', status: 'checking', responseTime: 0, lastChecked: null, statusCode: null, error: null },
    { name: 'JSONPlaceholder', url: 'https://jsonplaceholder.typicode.com/posts/1', status: 'checking', responseTime: 0, lastChecked: null, statusCode: null, error: null },
    { name: 'HTTPBin', url: 'https://httpbin.org/status/200', status: 'checking', responseTime: 0, lastChecked: null, statusCode: null, error: null },
    { name: 'Arbor Backend', url: 'http://98.81.173.59:8081/api/health', status: 'checking', responseTime: 0, lastChecked: null, statusCode: null, error: null }
  ];

  private checkInterval: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkAllEndpoints();
    // Check every 15 seconds
    this.checkInterval = setInterval(() => {
      this.checkAllEndpoints();
    }, 15000);
  }

  ngOnDestroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  checkAllEndpoints() {
    this.endpoints.forEach(endpoint => {
      this.checkEndpoint(endpoint);
    });
  }

  checkEndpoint(endpoint: ApiEndpoint) {
    endpoint.status = 'checking';
    endpoint.error = null;
    
    const startTime = performance.now();
    
    this.http.get(endpoint.url, { 
      observe: 'response',
      responseType: 'text',
      timeout: 5000
    }).subscribe({
      next: (response) => {
        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);
        
        endpoint.statusCode = response.status;
        endpoint.responseTime = responseTime;
        endpoint.lastChecked = new Date();
        
        if (responseTime > 2000) {
          endpoint.status = 'slow';
        } else if (response.status >= 200 && response.status < 300) {
          endpoint.status = 'online';
        } else {
          endpoint.status = 'offline';
          endpoint.error = `HTTP ${response.status}`;
        }
      },
      error: (err: HttpErrorResponse) => {
        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);
        
        endpoint.responseTime = responseTime;
        endpoint.lastChecked = new Date();
        endpoint.status = 'offline';
        
        if (err.status) {
          endpoint.statusCode = err.status;
          endpoint.error = `HTTP ${err.status}`;
        } else if (err.message.includes('timeout')) {
          endpoint.error = 'Request timeout';
        } else if (err.message.includes('Network')) {
          endpoint.error = 'Network error';
        } else {
          endpoint.error = 'Connection failed';
        }
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'online': return '#10b981';
      case 'slow': return '#f59e0b';
      case 'offline': return '#ef4444';
      case 'checking': return '#6b7280';
      default: return '#6b7280';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'online': return 'fa-circle-check';
      case 'slow': return 'fa-circle-exclamation';
      case 'offline': return 'fa-circle-xmark';
      case 'checking': return 'fa-spinner fa-spin';
      default: return 'fa-circle';
    }
  }

  getOnlineCount(): number {
    return this.endpoints.filter(e => e.status === 'online').length;
  }

  getSlowCount(): number {
    return this.endpoints.filter(e => e.status === 'slow').length;
  }

  getOfflineCount(): number {
    return this.endpoints.filter(e => e.status === 'offline').length;
  }
}
