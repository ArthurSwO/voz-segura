
// Manipulação de formulários
import { getUploadedFiles } from './fileUpload.js';
import { closeDenunciaModal, closeApoioModal, updateFormVisibility } from './modals.js';

export function handleFormSubmit(e) {
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
  
  const uploadedFiles = getUploadedFiles();
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

export function handleApoioFormSubmit(e) {
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

export function setupForms() {
  const denunciaForm = document.getElementById('denunciaForm');
  if (denunciaForm) {
    denunciaForm.onsubmit = handleFormSubmit;
  }
  
  const apoioForm = document.getElementById('apoioForm');
  if (apoioForm) {
    apoioForm.onsubmit = handleApoioFormSubmit;
  }
  
  const toggleAnonimo = document.getElementById('enviarAnonimo');
  if (toggleAnonimo) {
    toggleAnonimo.onchange = () => {
      updateFormVisibility();
    };
  }
}
