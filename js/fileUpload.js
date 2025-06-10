
// Upload de arquivos
import { formatFileSize, getFileIcon } from './utils.js';

let uploadedFiles = [];

export function removeFile(fileName, fileSize) {
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

function addFileToList(file) {
  const fileList = document.getElementById('fileList');
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
    <button type="button" class="remove-file" onclick="window.removeFile('${file.name}', ${file.size})">×</button>
  `;
  
  fileList.appendChild(fileItem);
}

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

export function setupFileUpload() {
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
}

export function getUploadedFiles() {
  return uploadedFiles;
}

export function clearUploadedFiles() {
  uploadedFiles = [];
}
