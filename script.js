document.addEventListener("DOMContentLoaded", function () {
  const messageInput = document.getElementById("message");
  const wordCountDisplay = document.getElementById("wordCount");

  if (messageInput && wordCountDisplay) {
    // Set aria-live for accessibility
    wordCountDisplay.setAttribute("aria-live", "polite");

    messageInput.addEventListener("input", function () {
      let words = messageInput.value.trim().split(/\s+/).filter(word => word.length > 0);
      let wordCount = words.length;

      // Limit to 100 words
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
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a"); // Get all mobile nav links

  // Function to open the menu
  function openMobileMenu() {
    mobileMenu.classList.add("active");
    // Optional: Add a class to body to prevent scrolling
    document.body.style.overflow = "hidden";
  }

  // Function to close the menu
  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    // Optional: Remove class from body to re-enable scrolling
    document.body.style.overflow = "";
  }

  // Event listener for opening the menu
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", openMobileMenu);
  } else {
    console.warn("Hamburger button not found.");
  }

  // Event listener for closing the menu
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMobileMenu);
  } else {
    console.warn("Close menu button not found.");
  }

  // Close menu when a navigation link is clicked (for smooth scrolling)
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", function() {
      closeMobileMenu(); // Close the menu
      // The smooth scroll behavior is already handled by HTML scroll-behavior: smooth
    });
  });

});