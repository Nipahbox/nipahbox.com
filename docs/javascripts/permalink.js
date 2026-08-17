// copy permalinks to clipboard on click

document$.subscribe(() => {
  const content = document.querySelector(".md-content");

  if (!content) return;

  content.querySelectorAll("h1 a, h2 a, h3 a, h4 a, h5 a")
    .forEach((link) => {
      if (link.dataset.copyListenerAdded) return;
      link.addEventListener("click", async () => {
        const url = new URL(
          link.getAttribute("href"),
          window.location.href
        ).href;

        try {
          await navigator.clipboard.writeText(url);
          copyMessage();
        } catch (error) {
          copyMessage();
          console.error(error);
        }
      });
      link.dataset.copyListenerAdded = "true";
    });
});

// and show notification

function copyMessage() {
  let message = document.querySelector(".copy-message");

  if (!message) {
    message = document.createElement("div");
    message.className = "copy-message";
    message.textContent = "Bağlantı Kopyalandı!";

    document.body.appendChild(message);
  }
   message.classList.remove("show");

  void message.offsetWidth;
  message.classList.add("show");
  clearTimeout(message.hideTimeout);

  message.hideTimeout = setTimeout(() => {
    message.classList.remove("show")
  }, 1000);
}
