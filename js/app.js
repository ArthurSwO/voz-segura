
// Inicialização principal da aplicação
import { scrollToSection, handleEmergencyExit, setupScrollEffect } from './navigation.js';
import { showSlide, startCarouselAutoPlay, setupCarouselControls } from './carousel.js';
import { openDenunciaModal, openApoioModal, setupModalControls, updateFormVisibility } from './modals.js';
import { setupFileUpload, removeFile } from './fileUpload.js';
import { setupForms } from './forms.js';
import { addSlideOutAnimation } from './utils.js';

function setupNavigation() {
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.onclick = function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      console.log('Nav link clicked:', targetId);
      scrollToSection(targetId);
    };
  });
  
  const emergencyBtn = document.querySelector('.emergency-exit');
  if (emergencyBtn) {
    emergencyBtn.onclick = function(e) {
      e.preventDefault();
      console.log('Emergency button clicked');
      handleEmergencyExit();
    };
  }
}

function setupActionButtons() {
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      const action = this.getAttribute('data-action');
      console.log('Button clicked with action:', action);
      
      switch(action) {
        case 'denuncia':
          openDenunciaModal();
          break;
        case 'orientacoes':
          scrollToSection('orientacoes');
          break;
        case 'apoio':
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
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
