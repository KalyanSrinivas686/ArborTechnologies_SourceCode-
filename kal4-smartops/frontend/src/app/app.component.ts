import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Arbor Technologies SmartOps Dashboard';
    socket: any;
    metrics: any = null;
    history: any[] = [];
    isConnected = false;
    logs: string[] = [];

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.connectSocket();
    }

    ngOnDestroy() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    connectSocket() {
        // Connect to the SmartOps backend on port 8080
        this.socket = io('http://localhost:8080', {
            transports: ['websocket', 'polling']
        });

        this.socket.on('connect', () => {
            this.isConnected = true;
            this.addLog('🟢 Connected to Arbor Technologies Intelligent Core');
            this.cdr.detectChanges();
        });

        this.socket.on('disconnect', () => {
            this.isConnected = false;
            this.addLog('🔴 Disconnected from Core');
            this.cdr.detectChanges();
        });

        this.socket.on('metrics', (data: any) => {
            this.metrics = data;
            this.updateHistory(data);
            if (data.insight && !data.insight.includes("stable")) {
                this.addLog(`⚡ AI Alert: ${data.insight}`);
            }
            this.cdr.detectChanges();
        });
    }

    updateHistory(data: any) {
        this.history.push(data.responseTime);
        if (this.history.length > 20) this.history.shift();
    }

    addLog(message: string) {
        const time = new Date().toLocaleTimeString();
        this.logs.unshift(`[${time}] ${message}`);
        if (this.logs.length > 8) this.logs.pop();
    }

    triggerSimulation(type: string) {
        if (this.socket) {
            this.socket.emit('simulate', type);
            const actionLabel = type === 'traffic_spike' ? 'Traffic Spike' : 'Security Breach';
            this.addLog(`⚠️ Manual Override: ${actionLabel}`);
        }
    }
}

