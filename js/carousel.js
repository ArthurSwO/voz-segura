
// Funcionalidade do carousel
let currentSlide = 0;
const totalSlides = 2;
let carouselInterval;

export function showSlide(index) {
  console.log('Showing slide:', index);
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  
  if (slides.length === 0) {
    console.error('Carousel slides not found');
    return;
  }
  
  // Normalizar o índice
  if (index >= slides.length) {
    index = 0;
    currentSlide = 0;
  }
  if (index < 0) {
    index = slides.length - 1;
    currentSlide = slides.length - 1;
  }
  
  // Remover classes ativas
  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  // Adicionar classes ativas
  if (slides[index]) {
    slides[index].classList.add('active');
    console.log(`Added active class to slide ${index}`);
  }
  if (indicators[index]) {
    indicators[index].classList.add('active');
    console.log(`Added active class to indicator ${index}`);
  }
}

export function nextSlide() {
  console.log('Next slide triggered, current:', currentSlide);
  currentSlide = (currentSlide + 1) % totalSlides;
  console.log('New current slide:', currentSlide);
  showSlide(currentSlide);
}

export function prevSlide() {
  console.log('Previous slide triggered, current:', currentSlide);
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  console.log('New current slide:', currentSlide);
  showSlide(currentSlide);
}

export function goToSlide(index) {
  console.log('Go to slide:', index);
  currentSlide = index;
  showSlide(currentSlide);
}

export function startCarouselAutoPlay() {
  console.log('Starting carousel autoplay');
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }
  carouselInterval = setInterval(() => {
    console.log('Auto-advancing carousel...');
    nextSlide();
  }, 5000);
}

export function setupCarouselControls() {
  console.log('Setting up carousel controls...');
  
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.preventDefault();
      console.log('Previous button clicked');
      prevSlide();
    };
    console.log('Previous button event listener added');
  } else {
    console.error('Previous button not found');
  }
  
  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.preventDefault();
      console.log('Next button clicked');
      nextSlide();
    };
    console.log('Next button event listener added');
  } else {
    console.error('Next button not found');
  }
  
  // Configurar indicadores
  document.querySelectorAll('.indicator').forEach((indicator, index) => {
    indicator.onclick = (e) => {
      e.preventDefault();
      console.log('Indicator clicked:', index);
      goToSlide(index);
    };
  });
  console.log('Indicator event listeners added');
}
