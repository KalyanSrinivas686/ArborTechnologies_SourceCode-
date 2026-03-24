// Basic setup
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Create app
const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:4200", "http://localhost:4201"],
    }
});

// API Endpoints
app.get('/health', (req, res) => {
    res.json({
        service: "Arbor Technologies SmartOps API",
        status: "UP",
        time: new Date()
    });
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`📩 New Contact Form Submission from ${name} (${email})`);

    // In a real app, you'd send an email or save to DB here
    res.status(200).json({
        success: true,
        message: "Thank you for contacting Arbor Technologies! Our team has received your message and will get back to you within 24 hours."
    });
});

app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    console.log(`🗞️ New Newsletter Subscription: ${email}`);

    res.status(200).json({
        success: true,
        message: "Successfully subscribed to Arbor Technologies insights!"
    });
});

// Function to generate fake DevOps metrics
function generateMetrics() {
    const responseTime = Math.floor(Math.random() * 500) + 100;
    const errorRate = Math.random() > 0.85 ? 2.3 : 0.2;

    let insight = "System stable. No anomalies detected.";

    if (responseTime > 450) {
        insight = "⚠️ High response time detected.";
    }

    if (errorRate > 1) {
        insight = "🚨 Error rate spike detected.";
    }

    return {
        service: "arbor-tech-api",
        status: "UP",
        responseTime: responseTime,
        errorRate: errorRate,
        lastUpdated: new Date().toLocaleTimeString(),
        insight: insight
    };
}

// WebSocket connection
io.on('connection', (socket) => {
    console.log("🟢 Frontend connected");
    let simulationMode = null;

    const sendMetrics = () => {
        let metrics = generateMetrics();

        // Apply simulations
        if (simulationMode === 'traffic_spike') {
            metrics.responseTime = Math.floor(Math.random() * 200) + 800; // Spike response time
            metrics.insight = "⚡ CRITICAL: Unexpected Traffic Spike Detected!";
        } else if (simulationMode === 'security_threat') {
            metrics.errorRate = Math.floor(Math.random() * 5) + 15; // High error rate
            metrics.insight = "🛡️ AI Core: Blocking Suspicious IP Patterns...";
        }

        socket.emit("metrics", metrics);
    };

    const interval = setInterval(sendMetrics, 3000);

    socket.on("simulate", (type) => {
        console.log(`🎮 Simulation Triggered: ${type}`);
        simulationMode = type;
        // Auto-reset simulation after 10 seconds
        setTimeout(() => {
            simulationMode = null;
        }, 10000);
    });

    socket.on("disconnect", () => {
        console.log("🔴 Frontend disconnected");
        clearInterval(interval);
    });
});

// Start server
server.listen(8080, () => {
    console.log("🚀 Arbor Technologies SmartOps backend running on port 8080");
});
