// spoiler tag and spoiler description
document.querySelectorAll(".spoiler").forEach(spoiler => {
  const content = document.createElement("span");
  content.className = "spoiler-content";
  content.textContent = spoiler.textContent;

  const description = document.createElement("span");
  description.className = "spoiler-description";
  description.textContent = spoiler.dataset.description || "SPOILER ABI DUR";

  spoiler.textContent = "";
  spoiler.append(content, description);

  spoiler.addEventListener("click", () => {
    spoiler.classList.toggle("revealed");
    description.style.opacity =
      spoiler.classList.contains("revealed") ? "0" : "1";
  });

  spoiler.addEventListener("mousemove", event => {
    description.style.left = `${event.clientX}px`;
    description.style.top = `${event.clientY + 13}px`;
  });

  spoiler.addEventListener("mouseenter", () => {
    if (!spoiler.classList.contains("revealed")) {
      description.style.opacity = "1";
    }
  });

  spoiler.addEventListener("mouseleave", () => {
    description.style.opacity = "0";
  })
});

// open external links in new tab
function openExternalLinksInNewTab() {
  const content = document.querySelector(".md-content");

  if (!content) return;

  const links = content.querySelectorAll("a[href]");

  links.forEach((link) => {
    const isExternal =
      link.hostname !== window.location.hostname;

    if (!isExternal) return;

    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

document$.subscribe(() => {
  openExternalLinksInNewTab()
});
