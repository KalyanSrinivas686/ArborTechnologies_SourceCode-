import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { io } from 'socket.io-client';

@Component({
    selector: 'app-live-demo',
    imports: [CommonModule],
    templateUrl: './live-demo.html',
    styleUrl: './live-demo.css'
})
export class LiveDemoComponent implements OnInit, OnDestroy {
    socket: any;
    metrics: any = null;
    history: any[] = [];
    isConnected = false;

    // Simulated logs for "AI Analysis"
    logs: string[] = [];

    constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.connectSocket();
    }

    ngOnDestroy() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    connectSocket() {
        this.socket = io('http://localhost:8080', {
            transports: ['websocket', 'polling']
        });

        this.socket.on('connect_error', (err: any) => {
            this.ngZone.run(() => {
                this.addLog(`❌ Connection Error: ${err.message}`);
                this.cdr.detectChanges();
            });
        });

        this.socket.on('connect', () => {
            this.ngZone.run(() => {
                this.isConnected = true;
                this.addLog('🟢 Connected to Arbor Technologies Intelligent Core');
                this.cdr.detectChanges();
            });
        });

        this.socket.on('disconnect', () => {
            this.ngZone.run(() => {
                this.isConnected = false;
                this.addLog('🔴 Disconnected from Core');
                this.cdr.detectChanges();
            });
        });

        this.socket.on('metrics', (data: any) => {
            this.ngZone.run(() => {
                this.metrics = data;
                this.updateHistory(data);

                if (data.insight && data.insight !== "System stable. No anomalies detected.") {
                    this.addLog(`⚡ AI Alert: ${data.insight}`);
                }
                this.cdr.detectChanges();
            });
        });
    }

    updateHistory(data: any) {
        this.history.push(data.responseTime);
        if (this.history.length > 20) this.history.shift();
    }

    addLog(message: string) {
        const time = new Date().toLocaleTimeString();
        this.logs.unshift(`[${time}] ${message}`);
        if (this.logs.length > 5) this.logs.pop();
    }

    triggerSimulation(type: string) {
        if (this.socket) {
            this.socket.emit('simulate', type);
            const actionLabel = type === 'traffic_spike' ? 'Traffic Spike' : 'Security Breach';
            this.addLog(`⚠️ User Triggered Simulation: ${actionLabel}`);
            this.cdr.detectChanges();
        }
    }
}
