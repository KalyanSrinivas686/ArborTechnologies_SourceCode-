// Notification Banner JavaScript
function closeNotification() {
  const banner = document.getElementById('notificationBanner');
  banner.style.transition = 'all 0.3s ease';
  banner.style.transform = 'translateY(-100%)';
  banner.style.opacity = '0';
  
  setTimeout(() => {
    banner.style.display = 'none';
  }, 300);
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeNotification();
  }
}

// Countdown Timer
function startCountdown() {
  const countdownElement = document.getElementById('offerCountdown');
  if (!countdownElement) return;
  
  // Set end time to 24 hours from now
  const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = endTime - now;
    
    if (distance > 0) {
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      countdownElement.textContent = `Ends in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      countdownElement.textContent = 'Offer Expired';
      countdownElement.style.background = 'rgba(255, 0, 0, 0.3)';
    }
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Auto-hide notification after 10 seconds
function autoHideNotification() {
  setTimeout(() => {
    const banner = document.getElementById('notificationBanner');
    if (banner && banner.style.display !== 'none') {
      closeNotification();
    }
  }, 10000);
}

// Initialize notification functionality
document.addEventListener('DOMContentLoaded', function() {
  startCountdown();
  autoHideNotification();
  
  // Add functions to global scope
  window.closeNotification = closeNotification;
  window.scrollToSection = scrollToSection;
});
