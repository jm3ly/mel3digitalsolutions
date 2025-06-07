document.addEventListener("DOMContentLoaded", function () {
  
  // =================================================
  // ===== NEW: INTRO ANIMATION & STARS EFFECT =====
  // =================================================

  const intro = document.querySelector(".intro-section");
  const starsContainer = document.querySelector(".stars-container");
  const logo = document.querySelector(".intro-logo");

  // --- 1. The Fade-Out-On-Scroll Animation ---
  // We only want this to happen ONCE on the very first scroll
  window.addEventListener('scroll', () => {
    // Use GSAP to create a smooth fade-out animation
    gsap.to(intro, {
      opacity: 0,
      duration: 1.5, // Animation lasts 1.5 seconds
      ease: 'power2.out',
      // After fading out, hide it completely so it's not clickable
      onComplete: () => {
        intro.style.display = 'none';
      }
    });
  }, { once: true }); // The { once: true } option is key - it removes itself after running

  // --- 2. The "Shooting Stars" Effect ---
  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    starsContainer.appendChild(star);
    return star;
  }

  function animateStar(star) {
    // Randomize properties for a natural look
    const size = gsap.utils.random(2, 5); // Star size between 2px and 5px
    const startX = gsap.utils.random(0, window.innerWidth);
    const startY = gsap.utils.random(0, window.innerHeight);
    const endX = gsap.utils.random(0, window.innerWidth);
    const endY = gsap.utils.random(0, window.innerHeight);
    const duration = gsap.utils.random(5, 10); // Each star's journey takes 5-10 seconds

    // Set initial size and position
    gsap.set(star, {
      width: size,
      height: size,
      x: startX,
      y: startY,
      opacity: 0
    });

    // Animate the star across the screen
    gsap.to(star, {
      x: endX,
      y: endY,
      opacity: gsap.utils.random(0.5, 1),
      duration: duration,
      ease: 'power1.out',
      // When the animation completes, run it again from a new position
      onComplete: () => animateStar(star)
    });
  }

  // Create and animate 50 stars
  for (let i = 0; i < 50; i++) {
    const star = createStar();
    animateStar(star);
  }


  // =================================================
  // ===== EXISTING SCRIPT CODE (UNCHANGED) ======
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
  } else {
    console.warn("Required elements #message or #wordCount not found.");
  }

  // --- Hamburger Menu Functionality ---
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
  } else {
    console.warn("Hamburger button not found.");
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMobileMenu);
  } else {
    console.warn("Close menu button not found.");
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener("click", function() {
      closeMobileMenu();
    });
  });

});