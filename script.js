
// Smooth scrolling para seções
function scrollToSection(sectionId) {
  console.log('Scrolling to section:', sectionId);
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = document.querySelector('.header').offsetHeight;
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
  // Redireciona para um site neutro para segurança
  window.location.href = 'https://www.google.com';
}

// Carousel functionality
let currentSlide = 0;
const totalSlides = 2;

function showSlide(index) {
  console.log('Showing slide:', index);
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  
  if (!track || slides.length === 0) {
    console.error('Carousel elements not found');
    return;
  }
  
  // Remove active class from all slides and indicators
  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  // Add active class to current slide and indicator
  if (slides[index]) slides[index].classList.add('active');
  if (indicators[index]) indicators[index].classList.add('active');
  
  // Move track
  track.style.transform = `translateX(-${index * 50}%)`;
}

function nextSlide() {
  console.log('Next slide triggered');
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  console.log('Previous slide triggered');
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

function goToSlide(index) {
  console.log('Go to slide:', index);
  currentSlide = index;
  showSlide(currentSlide);
}

// Auto-play carousel - aumentado para 8 segundos
function startCarouselAutoPlay() {
  console.log('Starting carousel autoplay');
  setInterval(() => {
    nextSlide();
  }, 8000); // Aumentado de 5000 para 8000ms (8 segundos)
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
  
  // Animar entrada do modal
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
  
  // Resetar formulário
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
  
  // Click no upload area
  fileUploadArea.addEventListener('click', () => {
    console.log('File upload area clicked');
    fileInput.click();
  });
  
  // Drag and drop
  fileUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadArea.classList.add('dragover');
  });
  
  fileUploadArea.addEventListener('dragleave', () => {
    fileUploadArea.classList.remove('dragover');
  });
  
  fileUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });
  
  // Seleção de arquivos
  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });
  
  function handleFiles(files) {
    console.log('Handling files:', files.length);
    Array.from(files).forEach(file => {
      // Verificar tamanho máximo (50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert(`Arquivo ${file.name} é muito grande. Máximo permitido: 50MB`);
        return;
      }
      
      // Verificar se já não foi adicionado
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
  
  // Remover da visualização
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
  
  // Coletar dados do formulário
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
  
  // Adicionar arquivos
  uploadedFiles.forEach((file, index) => {
    formData.append(`arquivo_${index}`, file);
  });
  
  // Simulação de envio
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

// Nova função para abrir email de apoio
function openEmailSupport() {
  console.log('Opening email support');
  const subject = encodeURIComponent('Solicitação de Apoio Emocional - VOZ ATIVA');
  const body = encodeURIComponent('Olá,\n\nGostaria de solicitar apoio emocional através da plataforma VOZ ATIVA.\n\nObrigado(a).');
  const mailtoLink = `mailto:vozsegura.ba@gmail.com?subject=${subject}&body=${body}`;
  
  window.open(mailtoLink, '_blank');
}

// Inicialização quando o DOM estiver carregado
function initializeApp() {
  console.log('Initializing app...');
  
  // Configurar navegação
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
  
  // Configurar botão de emergência
  const emergencyBtn = document.querySelector('.emergency-exit');
  if (emergencyBtn) {
    emergencyBtn.addEventListener('click', handleEmergencyExit);
  }
  
  // Configurar botões do carousel
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  // Configurar indicadores do carousel
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
  
  // Configurar botões principais
  const denunciaButtons = document.querySelectorAll('[onclick*="openDenunciaModal"]');
  denunciaButtons.forEach(btn => {
    btn.removeAttribute('onclick');
    btn.addEventListener('click', openDenunciaModal);
  });
  
  const apoioButtons = document.querySelectorAll('[onclick*="openEmailSupport"]');
  apoioButtons.forEach(btn => {
    btn.removeAttribute('onclick');
    btn.addEventListener('click', openEmailSupport);
  });
  
  // Configurar modal
  const closeModalBtn = document.querySelector('.close-modal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeDenunciaModal);
  }
  
  // Configurar upload de arquivos
  setupFileUpload();
  
  // Configurar toggle anônimo
  const toggleAnonimo = document.getElementById('enviarAnonimo');
  if (toggleAnonimo) {
    toggleAnonimo.addEventListener('change', updateFormVisibility);
  }
  
  // Configurar submissão do formulário
  const denunciaForm = document.getElementById('denunciaForm');
  if (denunciaForm) {
    denunciaForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Configurar visibilidade inicial dos campos
  updateFormVisibility();
  
  // Iniciar carousel autoplay
  startCarouselAutoPlay();
  
  console.log('App initialized successfully');
}

// Event listeners para carregamento da página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('denunciaModal');
    if (modal && modal.classList.contains('active')) {
      closeDenunciaModal();
    }
  }
});

// Fechar modal clicando fora dele
document.addEventListener('click', function(e) {
  const modal = document.getElementById('denunciaModal');
  if (e.target === modal) {
    closeDenunciaModal();
  }
});

// Adicionar efeito de scroll no header
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  if (window.scrollY > 100) {
    header.style.background = 'rgba(139, 92, 246, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'linear-gradient(135deg, #8B5CF6, #EC4899)';
    header.style.backdropFilter = 'none';
  }
});

// Adicionar animação CSS para slideOutUp
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
window.openEmailSupport = openEmailSupport;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.removeFile = removeFile;
