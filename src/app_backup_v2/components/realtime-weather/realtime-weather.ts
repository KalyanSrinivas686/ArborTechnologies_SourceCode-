import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number | null;
  lastUpdated: Date;
}

@Component({
  selector: 'app-realtime-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realtime-weather.html',
  styleUrl: './realtime-weather.css'
})
export class RealtimeWeatherComponent implements OnInit, OnDestroy {
  weatherData: WeatherData[] = [];
  loading = true;
  error: string | null = null;
  private updateInterval: any;

  // Major cities to monitor
  cities = [
    { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
    { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
    { name: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198 },
    { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
    { name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708 }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchWeatherData();
    // Update every 5 minutes (OpenWeatherMap free tier allows frequent updates)
    this.updateInterval = setInterval(() => {
      this.fetchWeatherData();
    }, 300000);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  fetchWeatherData() {
    this.loading = true;
    this.error = null;
    
    // Using Open-Meteo API - completely free, no API key required
    const promises = this.cities.map(city => {
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code&timezone=auto`;
      
      return this.http.get<any>(apiUrl).toPromise().then((data: any) => {
        const current = data.current;
        const weatherCode = current.weather_code;
        
        return {
          city: city.name,
          country: city.country,
          temperature: Math.round(current.temperature_2m),
          feelsLike: Math.round(current.apparent_temperature),
          description: this.getWeatherDescription(weatherCode),
          icon: this.getWeatherIconCode(weatherCode),
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m * 3.6), // Convert m/s to km/h
          pressure: Math.round(current.pressure_msl),
          visibility: null,
          lastUpdated: new Date()
        } as WeatherData;
      }).catch((err) => {
        console.error(`Error fetching weather for ${city.name}:`, err);
        return null;
      });
    });

    Promise.all(promises).then(results => {
      this.weatherData = results.filter((data): data is WeatherData => data !== null);
      this.loading = false;
      if (this.weatherData.length === 0) {
        this.error = 'Unable to fetch weather data. Please try again later.';
      }
    });
  }

  getWeatherDescription(code: number): string {
    // WMO Weather interpretation codes
    if (code === 0) return 'Clear sky';
    if (code <= 3) return 'Partly cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 55) return 'Drizzle';
    if (code <= 65) return 'Rain';
    if (code <= 67) return 'Freezing rain';
    if (code <= 77) return 'Snow';
    if (code <= 82) return 'Rain showers';
    if (code <= 86) return 'Snow showers';
    if (code >= 95) return 'Thunderstorm';
    return 'Unknown';
  }

  getWeatherIconCode(code: number): string {
    // Return icon code for OpenWeatherMap icons (we'll use Font Awesome instead)
    if (code === 0) return '01d'; // Clear
    if (code <= 3) return '02d'; // Partly cloudy
    if (code <= 48) return '50d'; // Fog
    if (code <= 65) return '10d'; // Rain
    if (code <= 77) return '13d'; // Snow
    if (code >= 95) return '11d'; // Thunderstorm
    return '02d';
  }

  getWeatherIcon(description: string): string {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return 'fa-sun';
    if (desc.includes('cloud')) return 'fa-cloud';
    if (desc.includes('rain')) return 'fa-cloud-rain';
    if (desc.includes('snow')) return 'fa-snowflake';
    if (desc.includes('storm') || desc.includes('thunder')) return 'fa-bolt';
    if (desc.includes('fog')) return 'fa-smog';
    return 'fa-cloud-sun';
  }
}
