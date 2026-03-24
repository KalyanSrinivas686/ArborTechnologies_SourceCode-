// Live Chat Widget JavaScript
function toggleChat() {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.classList.toggle('active');
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const messagesContainer = document.getElementById('chatMessages');
  
  if (input.value.trim() === '') return;
  
  // Add user message
  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.innerHTML = `
    <div class="message-content">${input.value}</div>
  `;
  messagesContainer.appendChild(userMessage);
  
  const userText = input.value;
  input.value = '';
  
  // Simulate bot response
  setTimeout(() => {
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot';
    
    let response = '';
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('pricing') || lowerText.includes('cost')) {
      response = '💰 Our pricing starts with a free health check! DevOps setup is ₹49,999/project and managed services are ₹29,999/month. Would you like details on any specific service?';
    } else if (lowerText.includes('aws') || lowerText.includes('cloud')) {
      response = '☁️ We\'re AWS certified experts! We can help with architecture, cost optimization, migration, and 24/7 monitoring. What specific AWS service are you interested in?';
    } else if (lowerText.includes('devops') || lowerText.includes('deployment')) {
      response = '🚀 DevOps is our specialty! We set up CI/CD pipelines, container orchestration, infrastructure as code, and automated testing. What\'s your current setup like?';
    } else if (lowerText.includes('security') || lowerText.includes('compliance')) {
      response = '🔒 Security is critical! We implement SOC 2 compliance, encryption, access management, and regular security audits. What security concerns do you have?';
    } else if (lowerText.includes('contact') || lowerText.includes('phone') || lowerText.includes('email')) {
      response = '📞 You can reach us at:\n• Phone: +91 9121650564\n• Email: arbortech.cloud@gmail.com\n• Or schedule a free consultation here!';
    } else if (lowerText.includes('free') || lowerText.includes('consultation')) {
      response = '🎁 Great! Our free 30-minute cloud health check includes:\n• Infrastructure audit\n• Cost analysis\n• Security assessment\n• Optimization recommendations\n\nReady to schedule?';
    } else {
      response = '👋 Thanks for your message! I can help you with:\n• Cloud architecture & AWS services\n• DevOps & CI/CD pipelines\n• Cost optimization\n• Security & compliance\n• Free consultations\n\nWhat would you like to know more about?';
    }
    
    botMessage.innerHTML = `
      <div class="message-content">${response}</div>
    `;
    messagesContainer.appendChild(botMessage);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 1000);
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

// Initialize chat functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add chat functionality to global scope
  window.toggleChat = toggleChat;
  window.sendMessage = sendMessage;
  window.handleChatKeyPress = handleChatKeyPress;
});
