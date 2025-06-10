
// Smooth scrolling para seções
function scrollToSection(sectionId) {
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

// Função de saída rápida de emergência
function handleEmergencyExit() {
  console.log('Emergency exit triggered');
  window.location.href = 'https://www.google.com';
}

// Carousel functionality
let currentSlide = 0;
const totalSlides = 2;

function showSlide(index) {
  console.log('Showing slide:', index);
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  
  if (slides.length === 0) {
    console.error('Carousel slides not found');
    return;
  }
  
  // Garantir que o índice está dentro do range válido
  if (index >= slides.length) {
    index = 0;
    currentSlide = 0;
  }
  if (index < 0) {
    index = slides.length - 1;
    currentSlide = slides.length - 1;
  }
  
  // Remove active class from all slides and indicators
  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  // Add active class to current slide and indicator
  if (slides[index]) {
    slides[index].classList.add('active');
    console.log(`Added active class to slide ${index}`);
  }
  if (indicators[index]) {
    indicators[index].classList.add('active');
    console.log(`Added active class to indicator ${index}`);
  }
}

function nextSlide() {
  console.log('Next slide triggered, current:', currentSlide);
  currentSlide = (currentSlide + 1) % totalSlides;
  console.log('New current slide:', currentSlide);
  showSlide(currentSlide);
}

function prevSlide() {
  console.log('Previous slide triggered, current:', currentSlide);
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  console.log('New current slide:', currentSlide);
  showSlide(currentSlide);
}

function goToSlide(index) {
  console.log('Go to slide:', index);
  currentSlide = index;
  showSlide(currentSlide);
}

// Auto-play carousel
let carouselInterval;

function startCarouselAutoPlay() {
  console.log('Starting carousel autoplay');
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }
  carouselInterval = setInterval(() => {
    console.log('Auto-advancing carousel...');
    nextSlide();
  }, 5000);
}

// Modal de Denúncia
function openDenunciaModal() {
  console.log('Opening denuncia modal');
  const modal = document.getElementById('denunciaModal');
  if (!modal) {
    console.error('Modal not found');
    return;
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.style.transform = 'translateY(0) scale(1)';
    }
  }, 10);
}

function closeDenunciaModal() {
  console.log('Closing denuncia modal');
  const modal = document.getElementById('denunciaModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  const form = document.getElementById('denunciaForm');
  if (form) {
    form.reset();
  }
  
  const fileList = document.getElementById('fileList');
  if (fileList) {
    fileList.innerHTML = '';
  }
  
  updateFormVisibility();
}

// Modal de Apoio Emocional
function openApoioModal() {
  console.log('Opening apoio modal');
  const modal = document.getElementById('apoioModal');
  if (!modal) {
    console.error('Apoio modal not found');
    return;
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.style.transform = 'translateY(0) scale(1)';
    }
  }, 10);
}

function closeApoioModal() {
  console.log('Closing apoio modal');
  const modal = document.getElementById('apoioModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  const form = document.getElementById('apoioForm');
  if (form) {
    form.reset();
  }
}

// Controle de visibilidade dos campos baseado no toggle anônimo
function updateFormVisibility() {
  const isAnonymous = document.getElementById('enviarAnonimo')?.checked || false;
  const nomeField = document.getElementById('nomeCompleto');
  const emailField = document.getElementById('email');
  const telefoneField = document.getElementById('telefone');
  
  if (!nomeField || !emailField || !telefoneField) return;
  
  if (isAnonymous) {
    nomeField.style.opacity = '0.5';
    emailField.style.opacity = '0.5';
    telefoneField.style.opacity = '0.5';
    nomeField.required = false;
    emailField.required = false;
    telefoneField.required = false;
    nomeField.placeholder = 'NOME COMPLETO (OPCIONAL)';
    emailField.placeholder = 'EMAIL (OPCIONAL)';
    telefoneField.placeholder = 'TELEFONE (OPCIONAL)';
  } else {
    nomeField.style.opacity = '1';
    emailField.style.opacity = '1';
    telefoneField.style.opacity = '1';
    nomeField.required = true;
    emailField.required = true;
    telefoneField.required = true;
    nomeField.placeholder = 'NOME COMPLETO';
    emailField.placeholder = 'EMAIL';
    telefoneField.placeholder = 'TELEFONE';
  }
}

// Upload de arquivos
let uploadedFiles = [];

function setupFileUpload() {
  const fileInput = document.getElementById('fileInput');
  const fileUploadArea = document.getElementById('fileUploadArea');
  const fileList = document.getElementById('fileList');
  
  if (!fileInput || !fileUploadArea || !fileList) {
    console.error('File upload elements not found');
    return;
  }
  
  fileUploadArea.onclick = () => {
    console.log('File upload area clicked');
    fileInput.click();
  };
  
  fileUploadArea.ondragover = (e) => {
    e.preventDefault();
    fileUploadArea.classList.add('dragover');
  };
  
  fileUploadArea.ondragleave = () => {
    fileUploadArea.classList.remove('dragover');
  };
  
  fileUploadArea.ondrop = (e) => {
    e.preventDefault();
    fileUploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  };
  
  fileInput.onchange = (e) => {
    handleFiles(e.target.files);
  };
  
  function handleFiles(files) {
    console.log('Handling files:', files.length);
    Array.from(files).forEach(file => {
      if (file.size > 50 * 1024 * 1024) {
        alert(`Arquivo ${file.name} é muito grande. Máximo permitido: 50MB`);
        return;
      }
      
      if (uploadedFiles.find(f => f.name === file.name && f.size === file.size)) {
        alert(`Arquivo ${file.name} já foi adicionado`);
        return;
      }
      
      uploadedFiles.push(file);
      addFileToList(file);
    });
  }
  
  function addFileToList(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileIcon = getFileIcon(file.type);
    const fileSize = formatFileSize(file.size);
    
    fileItem.innerHTML = `
      <div class="file-info">
        <span class="file-icon">${fileIcon}</span>
        <div>
          <div class="file-name">${file.name}</div>
          <div class="file-size">${fileSize}</div>
        </div>
      </div>
      <button type="button" class="remove-file" onclick="removeFile('${file.name}', ${file.size})">×</button>
    `;
    
    fileList.appendChild(fileItem);
  }
  
  function getFileIcon(fileType) {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.startsWith('video/')) return '🎬';
    return '📄';
  }
  
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

function removeFile(fileName, fileSize) {
  console.log('Removing file:', fileName);
  uploadedFiles = uploadedFiles.filter(file => 
    !(file.name === fileName && file.size === fileSize)
  );
  
  const fileItems = document.querySelectorAll('.file-item');
  fileItems.forEach(item => {
    const nameElement = item.querySelector('.file-name');
    if (nameElement && nameElement.textContent === fileName) {
      item.style.animation = 'slideOutUp 0.3s ease';
      setTimeout(() => {
        if (item.parentNode) {
          item.parentNode.removeChild(item);
        }
      }, 300);
    }
  });
}

// Submissão do formulário
function handleFormSubmit(e) {
  console.log('Form submit triggered');
  e.preventDefault();
  
  const formData = new FormData();
  const isAnonymous = document.getElementById('enviarAnonimo')?.checked || false;
  
  if (!isAnonymous) {
    formData.append('nomeCompleto', document.getElementById('nomeCompleto')?.value || '');
    formData.append('email', document.getElementById('email')?.value || '');
    formData.append('telefone', document.getElementById('telefone')?.value || '');
  }
  
  formData.append('data', document.getElementById('data')?.value || '');
  formData.append('tipoOcorrencia', document.getElementById('tipoOcorrencia')?.value || '');
  formData.append('descricao', document.getElementById('descricao')?.value || '');
  formData.append('evidencias', document.getElementById('evidencias')?.value || '');
  formData.append('anonimo', isAnonymous);
  
  uploadedFiles.forEach((file, index) => {
    formData.append(`arquivo_${index}`, file);
  });
  
  const submitButton = document.querySelector('.btn-continuar');
  if (!submitButton) return;
  
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Enviando...';
  submitButton.disabled = true;
  
  setTimeout(() => {
    alert('Denúncia enviada com sucesso! Você receberá um protocolo de acompanhamento.');
    closeDenunciaModal();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
}

// Submissão do formulário de apoio
function handleApoioFormSubmit(e) {
  console.log('Apoio form submit triggered');
  e.preventDefault();
  
  const nome = document.getElementById('apoioNome')?.value || 'Anônimo';
  const email = document.getElementById('apoioEmail')?.value || '';
  const mensagem = document.getElementById('apoioMensagem')?.value || '';
  
  const subject = encodeURIComponent('Solicitação de Apoio Emocional - VOZ SEGURA');
  const body = encodeURIComponent(`Olá,

Nome: ${nome}
Email: ${email}

Mensagem:
${mensagem}

Enviado através da plataforma VOZ SEGURA.`);
  
  const mailtoLink = `mailto:vozsegura.ba@gmail.com?subject=${subject}&body=${body}`;
  
  window.open(mailtoLink, '_blank');
  
  setTimeout(() => {
    closeApoioModal();
    alert('Sua solicitação foi preparada. Por favor, envie o email que foi aberto em seu cliente de email.');
  }, 1000);
}

// Inicialização simplificada
function initializeApp() {
  console.log('Initializing app...');
  
  // Aguardar DOM estar completamente carregado
  setTimeout(() => {
    console.log('Setting up event listeners...');
    
    // Configurar navegação
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.onclick = function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        console.log('Nav link clicked:', targetId);
        scrollToSection(targetId);
      };
    });
    
    // Configurar botão de emergência
    const emergencyBtn = document.querySelector('.emergency-exit');
    if (emergencyBtn) {
      emergencyBtn.onclick = function(e) {
        e.preventDefault();
        console.log('Emergency button clicked');
        handleEmergencyExit();
      };
    }
    
    // Configurar botões do carousel
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (prevBtn) {
      prevBtn.onclick = function(e) {
        e.preventDefault();
        console.log('Previous button clicked');
        prevSlide();
      };
    }
    if (nextBtn) {
      nextBtn.onclick = function(e) {
        e.preventDefault();
        console.log('Next button clicked');
        nextSlide();
      };
    }
    
    // Configurar indicadores do carousel
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.onclick = function(e) {
        e.preventDefault();
        console.log('Indicator clicked:', index);
        goToSlide(index);
      };
    });
    
    // Configurar botões principais usando data-action
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
    
    // Configurar modais - botões de fechar
    document.querySelectorAll('.close-modal').forEach(btn => {
      btn.onclick = function(e) {
        e.preventDefault();
        const modal = this.closest('.modal-overlay');
        if (modal) {
          if (modal.id === 'denunciaModal') {
            closeDenunciaModal();
          } else if (modal.id === 'apoioModal') {
            closeApoioModal();
          }
        }
      };
    });
    
    // Configurar upload de arquivos
    setupFileUpload();
    
    // Configurar toggle anônimo
    const toggleAnonimo = document.getElementById('enviarAnonimo');
    if (toggleAnonimo) {
      toggleAnonimo.onchange = updateFormVisibility;
    }
    
    // Configurar submissão do formulário
    const denunciaForm = document.getElementById('denunciaForm');
    if (denunciaForm) {
      denunciaForm.onsubmit = handleFormSubmit;
    }
    
    const apoioForm = document.getElementById('apoioForm');
    if (apoioForm) {
      apoioForm.onsubmit = handleApoioFormSubmit;
    }
    
    // Configurar visibilidade inicial dos campos
    updateFormVisibility();
    
    // Inicializar carrossel
    console.log('Initializing carousel...');
    showSlide(0);
    
    // Iniciar carousel autoplay
    startCarouselAutoPlay();
    
    console.log('App initialized successfully');
  }, 100);
}

// Event listeners principais
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Fechar modal com ESC
document.onkeydown = function(e) {
  if (e.key === 'Escape') {
    const denunciaModal = document.getElementById('denunciaModal');
    const apoioModal = document.getElementById('apoioModal');
    
    if (denunciaModal?.classList.contains('active')) {
      closeDenunciaModal();
    }
    if (apoioModal?.classList.contains('active')) {
      closeApoioModal();
    }
  }
};

// Fechar modal clicando fora dele
document.onclick = function(e) {
  const denunciaModal = document.getElementById('denunciaModal');
  const apoioModal = document.getElementById('apoioModal');
  
  if (e.target === denunciaModal) {
    closeDenunciaModal();
  }
  if (e.target === apoioModal) {
    closeApoioModal();
  }
};

// Efeito de scroll no header
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

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOutUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`;
document.head.appendChild(style);

// Expor funções globalmente para compatibilidade
window.scrollToSection = scrollToSection;
window.handleEmergencyExit = handleEmergencyExit;
window.openDenunciaModal = openDenunciaModal;
window.closeDenunciaModal = closeDenunciaModal;
window.openApoioModal = openApoioModal;
window.closeApoioModal = closeApoioModal;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.removeFile = removeFile;
