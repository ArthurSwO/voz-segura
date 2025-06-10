
// Controle dos modais
export function openDenunciaModal() {
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

export function closeDenunciaModal() {
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

export function openApoioModal() {
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

export function closeApoioModal() {
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

export function updateFormVisibility() {
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

export function setupModalControls() {
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        if (modal.id === 'denunciaModal') {
          closeDenunciaModal();
        } else if (modal.id === 'apoioModal') {
          closeApoioModal();
        }
      }
    };
  });

  document.onkeydown = (e) => {
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

  document.onclick = (e) => {
    const denunciaModal = document.getElementById('denunciaModal');
    const apoioModal = document.getElementById('apoioModal');
    
    if (e.target === denunciaModal) {
      closeDenunciaModal();
    }
    if (e.target === apoioModal) {
      closeApoioModal();
    }
  };
}
