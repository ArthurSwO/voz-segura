
// Carousel
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function changeSlide(direction) {
  currentSlideIndex += direction;
  if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
  if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
  showSlide(currentSlideIndex);
}

function currentSlide(index) {
  currentSlideIndex = index - 1;
  showSlide(currentSlideIndex);
}

// Auto slide
setInterval(() => {
  changeSlide(1);
}, 5000);

// Smooth scroll
function scrollTo(target) {
  document.querySelector(target).scrollIntoView({
    behavior: 'smooth'
  });
}

// Modal functions
function openModal(type) {
  const modal = document.getElementById(type + 'Modal');
  modal.style.display = 'block';
}

function closeModal(modal) {
  modal.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Close modals
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
      closeModal(this.closest('.modal'));
    };
  });

  // Close modal on outside click
  window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      closeModal(event.target);
    }
  };

  // Form submissions
  document.getElementById('denunciaForm').onsubmit = function(e) {
    e.preventDefault();
    alert('Denúncia enviada com sucesso!');
    closeModal(document.getElementById('denunciaModal'));
  };

  document.getElementById('apoioForm').onsubmit = function(e) {
    e.preventDefault();
    alert('Solicitação enviada com sucesso!');
    closeModal(document.getElementById('apoioModal'));
  };

  // Anonymous toggle
  document.getElementById('anonimo').onchange = function() {
    const inputs = document.querySelectorAll('#denunciaForm input[required]');
    inputs.forEach(input => {
      if (input.type !== 'date' && input.tagName !== 'SELECT') {
        input.required = !this.checked;
        input.style.opacity = this.checked ? '0.5' : '1';
      }
    });
  };

  // Navigation
  document.querySelectorAll('nav a').forEach(link => {
    link.onclick = function(e) {
      e.preventDefault();
      scrollTo(this.getAttribute('href'));
    };
  });
});
