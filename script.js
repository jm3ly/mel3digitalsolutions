// Wait for the DOM to load before accessing elements
document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.getElementById("message");
    const wordCountDisplay = document.getElementById("wordCount");
  
    if (messageInput && wordCountDisplay) {
      messageInput.addEventListener("input", function () {
        const words = messageInput.value.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
  
        wordCountDisplay.textContent = `${wordCount} / 100 words`;
  
        wordCountDisplay.style.color = wordCount > 100 ? "red" : "#555";
      });
    }
  });
  