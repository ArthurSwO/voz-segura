
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
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
  });
}

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
  
  // Inicializar animações
  animateOnScroll();
  
  // Adicionar funcionalidade aos botões de denúncia
  const denunciaButtons = document.querySelectorAll('.denuncia-card .btn-primary');
  denunciaButtons.forEach(button => {
    button.addEventListener('click', function() {
      alert('Funcionalidade de denúncia será implementada. Entre em contato pelos canais oficiais: Disque 100 ou Disque 180.');
    });
  });
  
  // Adicionar funcionalidade aos botões de orientação
  const orientacaoButtons = document.querySelectorAll('.denuncia-card .btn-secondary');
  orientacaoButtons.forEach(button => {
    button.addEventListener('click', function() {
      scrollToSection('orientacoes');
    });
  });
});

// Funcionalidade do menu mobile (se necessário)
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.classList.toggle('mobile-active');
}

// Adicionar efeito de hover nos cards
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.denuncia-card, .situacao-card, .contact-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    });
  });
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

// Inicializar contador quando a página carregar
document.addEventListener('DOMContentLoaded', animateCounter);

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

// Inicializar navegação ativa
document.addEventListener('DOMContentLoaded', updateActiveNav);
