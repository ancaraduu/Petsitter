(() => {
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const sections = [...document.querySelectorAll("[data-section]")];
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".reading-progress span");
  let scrollScheduled = false;
  let closedForPrint = null;

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

  function openLinkedContent(hash) {
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return null;
    }
    const target = document.getElementById(id);
    if (!target) return null;
    const milestone = target.closest(".milestone-section")?.querySelector(".milestone-disclosure");
    if (milestone) milestone.open = true;
    for (let ancestor = target; ancestor; ancestor = ancestor.parentElement) {
      if (ancestor.tagName === "DETAILS") ancestor.open = true;
    }
    scheduleReadingUpdate();
    return target;
  }

  function revealHashTarget() {
    const target = openLinkedContent(window.location.hash);
    if (target) window.requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const link = event.target.closest('a[href^="#"]');
    if (link) openLinkedContent(link.hash);
  });
  document.addEventListener("toggle", (event) => {
    if (event.target.matches(".milestone-disclosure") && !event.target.open) {
      event.target.querySelectorAll("video").forEach(video => video.pause());
    }
    scheduleReadingUpdate();
  }, true);
  window.addEventListener("hashchange", revealHashTarget);
  window.addEventListener("beforeprint", () => {
    if (closedForPrint) return;
    closedForPrint = [...document.querySelectorAll("details:not([open])")];
    closedForPrint.forEach(details => { details.open = true; });
  });
  window.addEventListener("afterprint", () => {
    closedForPrint?.forEach(details => { details.open = false; });
    closedForPrint = null;
    scheduleReadingUpdate();
  });
  window.addEventListener("scroll", scheduleReadingUpdate, { passive: true });
  window.addEventListener("resize", scheduleReadingUpdate);
  window.addEventListener("load", scheduleReadingUpdate);
  revealHashTarget();
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
