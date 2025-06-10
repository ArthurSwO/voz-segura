
// Inicialização principal da aplicação
import { scrollToSection, handleEmergencyExit, setupScrollEffect } from './navigation.js';
import { showSlide, startCarouselAutoPlay, setupCarouselControls } from './carousel.js';
import { openDenunciaModal, openApoioModal, setupModalControls, updateFormVisibility } from './modals.js';
import { setupFileUpload, removeFile } from './fileUpload.js';
import { setupForms } from './forms.js';
import { addSlideOutAnimation } from './utils.js';

function setupNavigation() {
  console.log('Setting up navigation...');
  const navLinks = document.querySelectorAll('.nav-menu a');
  console.log('Found nav links:', navLinks.length);
  
  navLinks.forEach(link => {
    link.onclick = function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      console.log('Nav link clicked:', targetId);
      scrollToSection(targetId);
    };
  });
  
  const emergencyBtn = document.querySelector('.emergency-exit');
  console.log('Emergency button found:', !!emergencyBtn);
  if (emergencyBtn) {
    emergencyBtn.onclick = function(e) {
      e.preventDefault();
      console.log('Emergency button clicked');
      handleEmergencyExit();
    };
  }
}

function setupActionButtons() {
  console.log('Setting up action buttons...');
  const actionButtons = document.querySelectorAll('[data-action]');
  console.log('Found action buttons:', actionButtons.length);
  
  actionButtons.forEach(btn => {
    console.log('Setting up button with action:', btn.getAttribute('data-action'));
    btn.onclick = function(e) {
      e.preventDefault();
      const action = this.getAttribute('data-action');
      console.log('Button clicked with action:', action);
      
      switch(action) {
        case 'denuncia':
          console.log('Opening denuncia modal...');
          openDenunciaModal();
          break;
        case 'orientacoes':
          console.log('Scrolling to orientacoes...');
          scrollToSection('orientacoes');
          break;
        case 'apoio':
          console.log('Opening apoio modal...');
          openApoioModal();
          break;
        default:
          console.warn('Unknown action:', action);
      }
    };
  });
}

function initializeApp() {
  console.log('Initializing app...');
  console.log('Document ready state:', document.readyState);
  
  // Aguardar um pouco para garantir que o DOM esteja pronto
  setTimeout(() => {
    console.log('Setting up event listeners...');
    
    setupNavigation();
    setupActionButtons();
    setupCarouselControls();
    setupModalControls();
    setupFileUpload();
    setupForms();
    setupScrollEffect();
    
    updateFormVisibility();
    
    console.log('Initializing carousel...');
    showSlide(0);
    startCarouselAutoPlay();
    
    addSlideOutAnimation();
    
    console.log('App initialized successfully');
  }, 100);
}

// Expor funções globalmente para compatibilidade
window.scrollToSection = scrollToSection;
window.handleEmergencyExit = handleEmergencyExit;
window.openDenunciaModal = openDenunciaModal;
window.openApoioModal = openApoioModal;
window.removeFile = removeFile;

// Inicialização
if (document.readyState === 'loading') {
  console.log('Document still loading, waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  console.log('Document already loaded, initializing immediately...');
  initializeApp();
}
