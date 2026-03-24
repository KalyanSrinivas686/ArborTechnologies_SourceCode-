// Animated Statistics Counter
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCount = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.ceil(current);
        setTimeout(updateCount, 20);
      } else {
        stat.textContent = target;
      }
    };
    
    updateCount();
  });
}

// Intersection Observer for triggering animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Start observing when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const statsSection = document.querySelector('.animated-stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
