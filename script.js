// Smooth scrolling para seções
function scrollToSection(sectionId) {
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
  // Redireciona para um site neutro para segurança
  window.location.href = 'https://www.google.com';
}

// Modal de Denúncia
function openDenunciaModal() {
  const modal = document.getElementById('denunciaModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Animar entrada do modal
  setTimeout(() => {
    modal.querySelector('.modal-content').style.transform = 'translateY(0) scale(1)';
  }, 10);
}

function closeDenunciaModal() {
  const modal = document.getElementById('denunciaModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  // Resetar formulário
  document.getElementById('denunciaForm').reset();
  document.getElementById('fileList').innerHTML = '';
  updateFormVisibility();
}

// Controle de visibilidade dos campos baseado no toggle anônimo
function updateFormVisibility() {
  const isAnonymous = document.getElementById('enviarAnonimo').checked;
  const nomeField = document.getElementById('nomeCompleto');
  const emailField = document.getElementById('email');
  const telefoneField = document.getElementById('telefone');
  
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
  
  // Click no upload area
  fileUploadArea.addEventListener('click', () => {
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
  e.preventDefault();
  
  const formData = new FormData();
  const isAnonymous = document.getElementById('enviarAnonimo').checked;
  
  // Coletar dados do formulário
  if (!isAnonymous) {
    formData.append('nomeCompleto', document.getElementById('nomeCompleto').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('telefone', document.getElementById('telefone').value);
  }
  
  formData.append('data', document.getElementById('data').value);
  formData.append('tipoOcorrencia', document.getElementById('tipoOcorrencia').value);
  formData.append('descricao', document.getElementById('descricao').value);
  formData.append('evidencias', document.getElementById('evidencias').value);
  formData.append('anonimo', isAnonymous);
  
  // Adicionar arquivos
  uploadedFiles.forEach((file, index) => {
    formData.append(`arquivo_${index}`, file);
  });
  
  // Simulação de envio
  const submitButton = document.querySelector('.btn-continuar');
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

// Adicionar efeito de scroll no header
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(139, 92, 246, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'linear-gradient(135deg, #8B5CF6, #EC4899)';
    header.style.backdropFilter = 'none';
  }
});

// Animação dos cards quando entram na tela
function animateOnScroll() {
  const cards = document.querySelectorAll('.denuncia-card, .situacao-card, .contact-card, .direito-item, .procedimento-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  cards.forEach(card => {
    observer.observe(card);
  });
}

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('denunciaModal');
    if (modal.classList.contains('active')) {
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

// Smooth scroll para links de navegação
document.addEventListener('DOMContentLoaded', function() {
  // Adicionar event listeners para links de navegação
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
  
  // Configurar upload de arquivos
  setupFileUpload();
  
  // Configurar toggle anônimo
  document.getElementById('enviarAnonimo').addEventListener('change', updateFormVisibility);
  
  // Configurar submissão do formulário
  document.getElementById('denunciaForm').addEventListener('submit', handleFormSubmit);
  
  // Inicializar animações
  animateOnScroll();
  
  // Configurar visibilidade inicial dos campos
  updateFormVisibility();
});

// Contador animado para estatísticas
function animateCounter() {
  const statNumber = document.querySelector('.stat-number');
  if (statNumber) {
    const target = parseInt(statNumber.textContent);
    let current = 0;
    const increment = target / 100;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            statNumber.textContent = Math.floor(current);
          }, 20);
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(statNumber);
  }
}

// Função para destacar link ativo na navegação
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Adicionar efeito parallax suave
function addParallaxEffect() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Inicializar todas as funcionalidades
document.addEventListener('DOMContentLoaded', function() {
  animateCounter();
  updateActiveNav();
  addParallaxEffect();
});

// Adicionar animação de typing para o título
function addTypingEffect() {
  const title = document.querySelector('.hero-title');
  if (title) {
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid #8B5CF6';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          title.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }
}

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
