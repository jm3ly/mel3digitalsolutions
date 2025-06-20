document.addEventListener("DOMContentLoaded", function () {

  // =================================================
  // ===== 1. INTRO ANIMATION & STARS EFFECT =====
  // =================================================
  const intro = document.querySelector(".intro-section");
  const starsContainer = document.querySelector(".stars-container");
  
  if (intro) {
    window.addEventListener('scroll', () => {
      gsap.to(intro, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        onComplete: () => {
          intro.style.display = 'none';
        }
      });
    }, { once: true });
  }

  if (starsContainer) {
    function createStar() {
      const star = document.createElement('div');
      star.classList.add('star');
      starsContainer.appendChild(star);
      return star;
    }

    function animateStar(star) {
      const size = gsap.utils.random(2, 5);
      const startX = gsap.utils.random(0, window.innerWidth);
      const startY = gsap.utils.random(0, window.innerHeight);
      const endX = gsap.utils.random(0, window.innerWidth);
      const endY = gsap.utils.random(0, window.innerHeight);
      const duration = gsap.utils.random(5, 10);

      gsap.set(star, { width: size, height: size, x: startX, y: startY, opacity: 0 });

      gsap.to(star, {
        x: endX,
        y: endY,
        opacity: gsap.utils.random(0.5, 1),
        duration: duration,
        ease: 'power1.out',
        onComplete: () => animateStar(star)
      });
    }

    for (let i = 0; i < 50; i++) {
      const star = createStar();
      animateStar(star);
    }
  }

  // ==========================================================
  // ===== 2. SCROLL-TRIGGERED ANIMATIONS =====
  // ==========================================================
  gsap.registerPlugin(ScrollTrigger);

  // --- Animation for Service Cards ---
  gsap.set('.service-card', { autoAlpha: 0, y: 50 });
  ScrollTrigger.batch(".service-card", {
    start: 'top 85%',
    onEnter: batch => gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2
    }),
    once: true
  });

  // --- Animation for About Us Section ---
  const aboutSection = document.querySelector('.about-us');
  if (aboutSection) {
    gsap.set(aboutSection.querySelector('.about-image'), { autoAlpha: 0, x: -50 });
    gsap.set(aboutSection.querySelector('.about-text'), { autoAlpha: 0, x: 50 });
    
    ScrollTrigger.create({
      trigger: aboutSection,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(aboutSection.querySelector('.about-image'), {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out'
        });
        
        gsap.to(aboutSection.querySelector('.about-text'), {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out'
        });
      },
      once: true
    });
  }

  // --- NEW: Animation for Portfolio Cards ---
  gsap.set('.portfolio-card', { autoAlpha: 0, y: 50 });
  ScrollTrigger.batch(".portfolio-card", {
    start: 'top 85%',
    onEnter: batch => gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2 // This creates the one-after-another effect
    }),
    once: true // Ensures the animation only runs once per card
  });


  // =================================================
  // ===== 3. EXISTING SCRIPT CODE (UNCHANGED) ======
  // =================================================
  const messageInput = document.getElementById("message");
  const wordCountDisplay = document.getElementById("wordCount");

  if (messageInput && wordCountDisplay) {
    wordCountDisplay.setAttribute("aria-live", "polite");
    messageInput.addEventListener("input", function () {
      let words = messageInput.value.trim().split(/\s+/).filter(word => word.length > 0);
      let wordCount = words.length;
      if (wordCount > 100) {
        words = words.slice(0, 100);
        messageInput.value = words.join(" ");
        wordCount = 100;
      }
      wordCountDisplay.textContent = `${wordCount} / 100 words`;
      wordCountDisplay.style.color = wordCount >= 100 ? "red" : "#555";
    });
  }

  const hamburgerBtn = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenuBtn = document.querySelector(".close-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");

  function openMobileMenu() {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", openMobileMenu);
  }
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMobileMenu);
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });
});

// After
gsap.to(batch, {
  autoAlpha: 1,
  y: 0,
  duration: 0.5, // <-- Now faster
  ease: 'power3.out',
  stagger: 0.2
})