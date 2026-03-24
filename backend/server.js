const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

// Use port 8081 to avoid conflicts
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all connections
    methods: ["GET", "POST"]
  }
});

// --- REAL-TIME METRICS SIMULATION ---
const insights = [
  "Traffic spike detected in US-East region. Auto-scaling triggered.",
  "Database latency optimizing. Query cache refreshed.",
  "Security scan complete. zero vulnerabilities found.",
  "New container deployment successful.",
  "System stable. No anomalies detected.",
  "Memory usage elevated in Pod-42. Garbage collection initiated."
];

function generateMetrics() {
  const errorRate = Math.random() < 0.1 ? (Math.random() * 5).toFixed(2) : 0; // Occasional small warnings
  const responseTime = Math.floor(Math.random() * (120 - 20 + 1) + 20); // 20ms - 120ms
  const insight = Math.random() < 0.3 ? insights[Math.floor(Math.random() * insights.length)] : "System stable. No anomalies detected.";

  return {
    timestamp: new Date(),
    status: "UP",
    cpuLoad: Math.floor(Math.random() * 60 + 20),
    memoryUsage: Math.floor(Math.random() * 40 + 30),
    activeUsers: Math.floor(Math.random() * 5000 + 1000),
    responseTime: responseTime,
    errorRate: errorRate,
    insight: insight
  };
}

// Emit metrics every 2 seconds
setInterval(() => {
  const data = generateMetrics();
  io.emit('metrics', data);
}, 2000);

io.on('connection', (socket) => {
  console.log('⚡ New Client Connected:', socket.id);

  // Send immediate initial data
  socket.emit('metrics', generateMetrics());

  socket.on('chat_message', (data) => {
    const query = data.query.toLowerCase();
    let response = "I'm analyzing your request. Our specialized team handles complex cases—would you like to book a strategic audit?";

    if (query.includes('saving') || query.includes('cost')) {
      response = "Our automated CloudOps typically reduces infrastructure spend by 30-45%. We achieve this through real-time instance rightsizing and automated waste elimination.";
    } else if (query.includes('health') || query.includes('status') || query.includes('up')) {
      response = "All systems are currently performing at 99.99% efficiency across US-East, EU-West, and APAC nodes. You can see live metrics in our dashboard.";
    } else if (query.includes('ai') || query.includes('model') || query.includes('machine')) {
      response = "We specialize in deploying GPU-optimized infrastructure for LLMs and deep learning. Our core currently processes over 1M AI-driven deployments monthly.";
    } else if (query.includes('security') || query.includes('threat') || query.includes('secure')) {
      response = "Our architecture is built on Zero-Trust principles. We use real-time AI anomaly detection to block suspicious patterns before they reach your data layer.";
    }

    // Zero-latency response
    socket.emit('ai_response', { text: response });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// --- API ROUTES ---

// Helper to validate email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  // In a real app, send email here
  console.log(`📩 New Contact: ${name} (${email}) - ${message}`);

  res.json({ success: true, message: 'Message sent successfully!' });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Arbor Technologies SmartOps Core Online' });
});

// Real-time Monitoring Endpoint
app.get('/api/monitoring', (req, res) => {
  const regions = [
    { region: 'US-East (Virginia)', status: 'operational', latency: Math.floor(Math.random() * 10 + 10), uptime: 99.99, activeInstances: 1247, incidents: 0 },
    { region: 'US-West (Oregon)', status: 'operational', latency: Math.floor(Math.random() * 10 + 15), uptime: 99.98, activeInstances: 892, incidents: 0 },
    { region: 'EU-West (Ireland)', status: 'operational', latency: Math.floor(Math.random() * 10 + 20), uptime: 99.97, activeInstances: 654, incidents: 0 },
    { region: 'APAC-Southeast (Singapore)', status: 'operational', latency: Math.floor(Math.random() * 10 + 25), uptime: 99.96, activeInstances: 423, incidents: 0 },
    { region: 'APAC-Northeast (Tokyo)', status: 'operational', latency: Math.floor(Math.random() * 10 + 25), uptime: 99.95, activeInstances: 389, incidents: 0 }
  ];

  const metrics = [
    { name: 'Global CPU Usage', value: Math.round((Math.random() * 30 + 30) * 10) / 10, unit: '%', status: 'healthy', trend: 'stable', change: Math.round((Math.random() - 0.5) * 5 * 10) / 10 },
    { name: 'Memory Utilization', value: Math.round((Math.random() * 30 + 50) * 10) / 10, unit: '%', status: 'healthy', trend: 'stable', change: Math.round((Math.random() - 0.5) * 3 * 10) / 10 },
    { name: 'Network Throughput', value: Math.round((Math.random() * 10 + 10) * 10) / 10, unit: 'Gbps', status: 'healthy', trend: 'up', change: Math.round((Math.random() * 2) * 10) / 10 },
    { name: 'API Response Time', value: Math.floor(Math.random() * 50 + 100), unit: 'ms', status: 'healthy', trend: 'down', change: Math.round((Math.random() * -10) * 10) / 10 },
    { name: 'Error Rate', value: Math.round((Math.random() * 0.1) * 100) / 100, unit: '%', status: 'healthy', trend: 'stable', change: 0 },
    { name: 'Database Connections', value: Math.floor(Math.random() * 200 + 1100), unit: 'active', status: 'healthy', trend: 'up', change: Math.floor(Math.random() * 30) }
  ];

  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    metrics,
    regions,
    autoRemediations: Math.floor(Math.random() * 50 + 100),
    globalUptime: 99.97
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Arbor Technologies Backend & SmartOps Socket running on http://localhost:${PORT}`);
});
