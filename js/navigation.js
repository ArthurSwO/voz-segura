
// Navegação e scroll
export function scrollToSection(sectionId) {
  console.log('Scrolling to section:', sectionId);
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}

export function handleEmergencyExit() {
  console.log('Emergency exit triggered');
  window.location.href = 'https://www.google.com';
}

export function setupScrollEffect() {
  window.onscroll = function() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    if (window.scrollY > 100) {
      header.style.background = 'rgba(139, 92, 246, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.background = 'linear-gradient(135deg, #8B5CF6, #EC4899)';
      header.style.backdropFilter = 'none';
    }
  };
}
