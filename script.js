(() => {
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const sections = [...document.querySelectorAll("[data-section]")];
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".reading-progress span");
  let scrollScheduled = false;

  function updateReadingPosition() {
    const headerBottom = header.getBoundingClientRect().bottom + 45;
    let activeSection = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= headerBottom) activeSection = section;
    }
    for (const link of navLinks) {
      if (link.hash === `#${activeSection.id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = scrollable > 0 ? Math.max(0, Math.min(1, window.scrollY / scrollable)) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    scrollScheduled = false;
  }

  function scheduleReadingUpdate() {
    if (scrollScheduled) return;
    scrollScheduled = true;
    window.requestAnimationFrame(updateReadingPosition);
  }

  window.addEventListener("scroll", scheduleReadingUpdate, { passive: true });
  window.addEventListener("resize", scheduleReadingUpdate);
  window.addEventListener("load", scheduleReadingUpdate);
  updateReadingPosition();

  const dialog = document.querySelector("#evidence-dialog");
  if (typeof dialog.showModal !== "function") return;

  const evidenceLinks = [...document.querySelectorAll(".evidence-link")];
  const image = document.querySelector("#evidence-image");
  const caption = document.querySelector("#evidence-caption");
  const counter = document.querySelector("#evidence-counter");
  const original = document.querySelector("#evidence-original");
  let currentIndex = 0;
  let opener = null;

  function displayEvidence(index) {
    currentIndex = (index + evidenceLinks.length) % evidenceLinks.length;
    const link = evidenceLinks[currentIndex];
    const thumbnail = link.querySelector("img");
    image.src = link.href;
    image.alt = thumbnail.alt;
    image.width = Number(thumbnail.getAttribute("width"));
    image.height = Number(thumbnail.getAttribute("height"));
    caption.textContent = link.dataset.caption;
    counter.textContent = `${currentIndex + 1} / ${evidenceLinks.length}`;
    original.href = link.href;
    dialog.querySelector(".dialog-image-wrap").scrollTop = 0;
  }

  evidenceLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      opener = link;
      displayEvidence(index);
      dialog.showModal();
      document.documentElement.classList.add("dialog-open");
    });
  });

  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  document.querySelector("#evidence-previous").addEventListener("click", () => displayEvidence(currentIndex - 1));
  document.querySelector("#evidence-next").addEventListener("click", () => displayEvidence(currentIndex + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      displayEvidence(currentIndex + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("dialog-open");
    opener?.focus({ preventScroll: true });
  });
})();
