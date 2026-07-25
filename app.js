const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-navigation]");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const readingProgress = document.querySelector("[data-reading-progress]");

if (readingProgress) {
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    readingProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

const archiveEntries = Array.from(document.querySelectorAll("[data-paths]"));
const archiveFilters = Array.from(document.querySelectorAll("[data-archive-filter]"));

if (archiveEntries.length && archiveFilters.length) {
  const paths = {
    "hy-vong": "Hy vọng",
    "tuoi-tre": "Tuổi trẻ",
    "mat-mat": "Mất mát",
    "tro-ve": "Trở về",
    "di-san": "Di sản",
  };
  const requestedPath = new URLSearchParams(window.location.search).get("path");
  const activePath = Object.hasOwn(paths, requestedPath) ? requestedPath : "all";

  archiveEntries.forEach((entry) => {
    const entryPaths = entry.dataset.paths.split(/\s+/);
    entry.hidden = activePath !== "all" && !entryPaths.includes(activePath);
  });

  archiveFilters.forEach((filter) => {
    const isCurrent = filter.dataset.archiveFilter === activePath;
    filter.classList.toggle("is-current", isCurrent);
    if (isCurrent) {
      filter.setAttribute("aria-current", "page");
    } else {
      filter.removeAttribute("aria-current");
    }
  });

  const visibleCount = archiveEntries.filter((entry) => !entry.hidden).length;
  const archiveCount = document.querySelector("[data-archive-count]");
  const archiveStatus = document.querySelector("[data-archive-status]");

  if (archiveCount) {
    archiveCount.textContent = `${visibleCount} bài viết`;
  }

  if (archiveStatus && activePath !== "all") {
    archiveStatus.textContent = `Mạch ${paths[activePath]}`;
  }
}
