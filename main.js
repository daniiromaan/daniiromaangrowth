// Main JavaScript - Daniel Premium Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Custom Interactive Cursor Glow
  const cursorGlow = document.getElementById('js-cursor-glow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      // Use requestAnimationFrame for performance optimization
      window.requestAnimationFrame(() => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
      });
    });
  }

  // 2. Card Light-Tracing (Hover Effect on Services Cards)
  const servicesCards = document.querySelectorAll('.services-card');
  servicesCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3. Navbar Scroll Transition
  const navbar = document.getElementById('js-navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Trigger initially in case of page refresh

  // 4. Active Navigation Link Highlighting on Scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Highlights as the section takes up the major center of viewport
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // 5. Hamburger Mobile Menu Toggle
  const hamburger = document.getElementById('js-hamburger');
  const navMenu = document.getElementById('js-nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 6. GSAP Scroll Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Entrance Animations (Smooth reveal)
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    
    heroTl.from('#hero-status-tag', { opacity: 0, y: -20, delay: 0.2 })
          .from('#hero-main-title span', { opacity: 0, y: 50, stagger: 0.15 }, '-=0.9')
          .from('#hero-sub', { opacity: 0, y: 20 }, '-=0.9')
          .from('.btn-group .btn', { opacity: 0, scale: 0.9, stagger: 0.1 }, '-=0.9')
          .from('#hero-portrait-box', { opacity: 0, scale: 0.95, duration: 1.5 }, '-=1.2')
          .from('.hero-badge', { opacity: 0, y: 30, stagger: 0.2, duration: 1.2 }, '-=1.0');

    // Section Titles Fade In
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
      gsap.from(header, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // About Section Content Reveal
    gsap.from('.about-content', {
      opacity: 0,
      x: -40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#quien-soy',
        start: 'top 75%'
      }
    });

    gsap.from('.about-card', {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-features',
        start: 'top 75%'
      }
    });

    // Services Stagger Reveal
    gsap.from('.services-card', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%'
      }
    });

    // Roadmap Cards Reveal
    gsap.from('.roadmap-card', {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.roadmap-container',
        start: 'top 80%'
      }
    });

    // Methodology Timeline Progress Line Animation
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      // Horizontal Timeline Progress
      gsap.to('#js-timeline-progress', {
        width: '100%',
        scrollTrigger: {
          trigger: '.timeline-outer',
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1
        }
      });
    }

    // Timeline Nodes Activation & Slide up
    const timelineNodes = document.querySelectorAll('.timeline-node');
    timelineNodes.forEach((node, index) => {
      gsap.from(node, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 80%',
          onEnter: () => {
            node.classList.add('active');
          }
        }
      });
    });

    // Count Up Statistics Animation
    const statsNumbers = document.querySelectorAll('.stats-number');
    statsNumbers.forEach(stat => {
      const targetVal = parseFloat(stat.getAttribute('data-target'));
      const textContent = stat.textContent.trim();
      const hasPercent = textContent.includes('%') || stat.parentElement.id === 'stat-card-satisfaction';
      const hasX = textContent.includes('x') || stat.parentElement.id === 'stat-card-roi';

      let countObj = { val: 0 };
      
      gsap.to(countObj, {
        val: targetVal,
        duration: 2.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          let displayVal = Math.floor(countObj.val);
          if (hasPercent) {
            stat.textContent = displayVal + '%';
          } else if (hasX) {
            stat.textContent = displayVal + 'x';
          } else {
            stat.textContent = displayVal;
          }
        }
      });
    });

    // Testimonials Grid Fade-in
    gsap.from('.testimonial-card', {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 80%'
      }
    });

    // Contact Details & Form Reveal
    gsap.from('#contact-details-box', {
      opacity: 0,
      x: -40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contacto',
        start: 'top 75%'
      }
    });

    gsap.from('#contact-form-wrapper', {
      opacity: 0,
      x: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contacto',
        start: 'top 75%'
      }
    });
  }

  // 7. Contact Form Interactive Submit
  const contactForm = document.getElementById('js-contact-form');
  const toast = document.getElementById('js-toast');
  const toastText = document.getElementById('js-toast-text');
  const submitBtn = document.getElementById('form-submit-btn-id');

  if (contactForm && toast && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Premium Button Loading State
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      // Simulate API call delay (1.5 seconds)
      setTimeout(() => {
        // Success feedback
        submitBtn.textContent = '¡Agendado!';
        submitBtn.style.backgroundColor = '#28a745'; // Green success color
        submitBtn.style.borderColor = '#28a745';
        submitBtn.style.color = '#fff';

        // Retrieve user details for personalized toast
        const clientName = document.getElementById('form-name').value;

        // Show Toast
        toastText.textContent = `¡Gracias ${clientName}! Nos pondremos en contacto contigo pronto.`;
        toast.classList.add('show');

        // Reset Toast after 4 seconds
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);

        // Reset Form and Button after another short delay
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalBtnText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.borderColor = '';
          submitBtn.style.color = '';
          submitBtn.style.opacity = '';
          submitBtn.disabled = false;
        }, 2000);

      }, 1500);
    });
  }
});
