import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface RegionStatus {
  region: string;
  status: 'operational' | 'degraded' | 'down';
  latency: number;
  uptime: number;
  activeInstances: number;
  incidents: number;
}

interface Incident {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  service: string;
  region: string;
  description: string;
  detectedAt: Date;
  status: 'detected' | 'investigating' | 'resolved' | 'auto-resolved';
  autoRemediated: boolean;
}

@Component({
  selector: 'app-realtime-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realtime-monitoring.html',
  styleUrl: './realtime-monitoring.css'
})
export class RealtimeMonitoringComponent implements OnInit, OnDestroy {
  metrics: SystemMetric[] = [];
  regions: RegionStatus[] = [];
  incidents: Incident[] = [];
  autoRemediations: number = 0;
  private updateInterval: any;

  constructor() {}

  ngOnInit() {
    this.initializeData();
    // Simulate real-time updates every 3 seconds
    this.updateInterval = setInterval(() => {
      this.updateMetrics();
      this.updateRegions();
      this.checkForIncidents();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  initializeData() {
    // Initial metrics
    this.metrics = [
      { name: 'Global CPU Usage', value: 42.3, unit: '%', status: 'healthy', trend: 'down', change: -2.1 },
      { name: 'Memory Utilization', value: 68.7, unit: '%', status: 'healthy', trend: 'stable', change: 0.3 },
      { name: 'Network Throughput', value: 12.4, unit: 'Gbps', status: 'healthy', trend: 'up', change: 1.2 },
      { name: 'API Response Time', value: 145, unit: 'ms', status: 'healthy', trend: 'down', change: -8 },
      { name: 'Error Rate', value: 0.02, unit: '%', status: 'healthy', trend: 'stable', change: 0 },
      { name: 'Database Connections', value: 1247, unit: 'active', status: 'healthy', trend: 'up', change: 23 }
    ];

    // Initial regions
    this.regions = [
      { region: 'US-East (Virginia)', status: 'operational', latency: 12, uptime: 99.99, activeInstances: 1247, incidents: 0 },
      { region: 'US-West (Oregon)', status: 'operational', latency: 18, uptime: 99.98, activeInstances: 892, incidents: 0 },
      { region: 'EU-West (Ireland)', status: 'operational', latency: 24, uptime: 99.97, activeInstances: 654, incidents: 0 },
      { region: 'APAC-Southeast (Singapore)', status: 'operational', latency: 31, uptime: 99.96, activeInstances: 423, incidents: 0 },
      { region: 'APAC-Northeast (Tokyo)', status: 'operational', latency: 28, uptime: 99.95, activeInstances: 389, incidents: 0 }
    ];

    // Initial incidents (empty, will be populated by anomaly detection)
    this.incidents = [];
    this.autoRemediations = 0;
  }

  updateMetrics() {
    this.metrics = this.metrics.map(metric => {
      const variation = (Math.random() - 0.5) * 5;
      let newValue = metric.value + variation;
      
      // Keep values within realistic bounds
      if (metric.name.includes('CPU') || metric.name.includes('Memory')) {
        newValue = Math.max(0, Math.min(100, newValue));
      } else if (metric.name.includes('Response Time')) {
        newValue = Math.max(50, Math.min(500, newValue));
      } else if (metric.name.includes('Throughput')) {
        newValue = Math.max(5, Math.min(50, newValue));
      }

      const change = newValue - metric.value;
      const trend = change > 1 ? 'up' : change < -1 ? 'down' : 'stable';
      
      // Determine status based on thresholds
      let status: 'healthy' | 'warning' | 'critical' = 'healthy';
      if (metric.name.includes('CPU') || metric.name.includes('Memory')) {
        if (newValue > 85) status = 'critical';
        else if (newValue > 70) status = 'warning';
      } else if (metric.name.includes('Response Time')) {
        if (newValue > 300) status = 'critical';
        else if (newValue > 200) status = 'warning';
      } else if (metric.name.includes('Error Rate')) {
        if (newValue > 1) status = 'critical';
        else if (newValue > 0.5) status = 'warning';
      }

      return {
        ...metric,
        value: Math.round(newValue * 10) / 10,
        trend,
        change: Math.round(change * 10) / 10,
        status
      };
    });
  }

  updateRegions() {
    this.regions = this.regions.map(region => {
      const latencyVariation = (Math.random() - 0.5) * 5;
      const newLatency = Math.max(10, region.latency + latencyVariation);
      
      // Randomly simulate occasional incidents (low probability)
      let status = region.status;
      let incidents = region.incidents;
      
      if (Math.random() < 0.02 && region.status === 'operational') {
        // Simulate a minor incident
        incidents++;
        status = 'degraded';
        this.createIncident(region.region, 'Performance degradation detected', 'medium');
      } else if (region.status === 'degraded' && Math.random() < 0.3) {
        // Auto-remediate
        status = 'operational';
        this.autoRemediations++;
      }

      return {
        ...region,
        latency: Math.round(newLatency),
        status,
        incidents
      };
    });
  }

  checkForIncidents() {
    // Simulate anomaly detection finding issues
    if (Math.random() < 0.05) {
      const services = ['API Gateway', 'Database Cluster', 'Cache Layer', 'Load Balancer', 'Message Queue'];
      const regions = this.regions.map(r => r.region);
      const service = services[Math.floor(Math.random() * services.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      
      const severities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high'];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      
      this.createIncident(region, `${service} - Anomaly detected`, severity);
    }

    // Auto-resolve some incidents
    this.incidents = this.incidents.map(incident => {
      if (incident.status === 'detected' && Math.random() < 0.4) {
        return {
          ...incident,
          status: 'auto-resolved' as const,
          autoRemediated: true
        };
      }
      return incident;
    });

    // Remove resolved incidents after a delay
    this.incidents = this.incidents.filter(incident => 
      incident.status !== 'resolved' && incident.status !== 'auto-resolved' ||
      (new Date().getTime() - incident.detectedAt.getTime()) < 30000
    );
  }

  createIncident(region: string, description: string, severity: 'low' | 'medium' | 'high' | 'critical') {
    const incident: Incident = {
      id: `INC-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      severity,
      service: description.split(' - ')[0],
      region,
      description,
      detectedAt: new Date(),
      status: 'detected',
      autoRemediated: false
    };

    this.incidents.unshift(incident);
    
    // Auto-remediate critical issues immediately (simulating DevOps automation)
    if (severity === 'critical' && Math.random() < 0.7) {
      setTimeout(() => {
        incident.status = 'auto-resolved';
        incident.autoRemediated = true;
        this.autoRemediations++;
      }, 2000);
    }

    // Keep only last 10 incidents
    if (this.incidents.length > 10) {
      this.incidents = this.incidents.slice(0, 10);
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'operational': return '#10b981';
      case 'degraded': return '#f59e0b';
      case 'down': return '#ef4444';
      case 'healthy': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  }

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#6b7280';
      default: return '#6b7280';
    }
  }
}
