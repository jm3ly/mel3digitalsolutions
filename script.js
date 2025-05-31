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
});
 