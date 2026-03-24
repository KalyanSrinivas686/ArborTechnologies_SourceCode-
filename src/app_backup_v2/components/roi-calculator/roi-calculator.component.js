// ROI Calculator Function
function calculateROI() {
  const monthlySpend = parseFloat(document.getElementById('monthly-spend').value) || 0;
  const teamSize = parseInt(document.getElementById('team-size').value) || 0;
  const downtimeHours = parseFloat(document.getElementById('downtime-hours').value) || 0;
  
  // Calculate savings (30-50% cost optimization)
  const costSavings = monthlySpend * 0.4; // 40% average savings
  
  // Calculate revenue protection (assuming ₹10,000 per hour of downtime)
  const hourlyRevenue = 10000;
  const revenueProtection = downtimeHours * hourlyRevenue * 0.95; // 95% prevention
  
  // Calculate team cost savings
  const teamCostPerMonth = teamSize * 80000; // ₹80,000 average per engineer
  const teamSavings = teamCostPerMonth * 0.5; // 50% efficiency gain
  
  // Total monthly savings
  const totalMonthlySavings = costSavings + revenueProtection + teamSavings;
  
  // Calculate annual ROI
  const annualSavings = totalMonthlySavings * 12;
  const investment = 49999; // DevOps setup cost
  const roi = ((annualSavings - investment) / investment * 100).toFixed(0);
  
  // Update results
  document.getElementById('monthly-savings').textContent = `₹${totalMonthlySavings.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
  document.getElementById('revenue-protection').textContent = `₹${revenueProtection.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
  document.getElementById('annual-roi').textContent = `${roi}%`;
  
  // Show results with animation
  const results = document.getElementById('results');
  results.style.opacity = '0';
  setTimeout(() => {
    results.style.opacity = '1';
    results.style.transition = 'opacity 0.5s ease';
  }, 100);
}

// FAQ Toggle Function
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const allItems = document.querySelectorAll('.faq-item');
  
  // Close all other items
  allItems.forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('active');
    }
  });
  
  // Toggle current item
  faqItem.classList.toggle('active');
}

// Initialize calculator on page load
document.addEventListener('DOMContentLoaded', function() {
  // Auto-calculate with default values
  calculateROI();
  
  // Add input event listeners for real-time calculation
  const inputs = ['monthly-spend', 'team-size', 'downtime-hours'];
  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', calculateROI);
      element.addEventListener('change', calculateROI);
    }
  });
});
