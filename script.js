const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const year = document.querySelector("[data-year]");
const keywordList = document.querySelector("[data-keyword-list]");
const keywordForm = document.querySelector("[data-keyword-form]");
const panelTabs = [...document.querySelectorAll("[data-panel-target]")];
const panels = [...document.querySelectorAll("[data-panel]")];
const requestForms = [...document.querySelectorAll("[data-request-form]")];
const requestList = document.querySelector("[data-request-list]");
const clearRequests = document.querySelector("[data-clear-requests]");
const languageButtons = [...document.querySelectorAll("[data-language]")];
const languageNote = document.querySelector("[data-language-note]");
const languageSelect = document.querySelector("[data-language-select]");
const countdownEl = document.querySelector("[data-countdown]");

const defaultKeywords = [
  "web developer",
  "local business helper",
  "website making",
  "business promotion",
  "marketing",
  "posters",
  "social media",
  "product finding",
  "video editing",
  "Instagram growth",
  "online ads",
  "social media marketing",
  "cooking",
  "embroidery",
  "record writing",
  "project help",
  "assignments",
  "delivery",
  "design",
  "tutoring",
];

const storage = {
  get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

let keywords = storage.get("dealsnutKeywords", defaultKeywords);
let requests = storage.get("dealsnutRequests", []);

if (year) {
  year.textContent = new Date().getFullYear();
}

const escapeText = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderKeywords = () => {
  if (!keywordList) return;
  keywordList.innerHTML = keywords
    .map((keyword) => `<span class="keyword-chip">${escapeText(keyword)}</span>`)
    .join("");
};

const renderRequests = () => {
  if (!requestList) return;

  if (!requests.length) {
    requestList.innerHTML =
      '<div class="empty-state">No prototype requests yet. Add one using any form above to see how the board will work before backend setup.</div>';
    return;
  }

  requestList.innerHTML = requests
    .slice()
    .reverse()
    .map(
      (request) => `
        <article class="saved-request">
          <span>${escapeText(request.type)}</span>
          <h4>${escapeText(request.need)}</h4>
          <p>${escapeText(request.details)}</p>
          <small>By ${escapeText(request.name)}${request.contact ? ` | Contact: ${escapeText(request.contact)}` : ""}</small>
        </article>
      `
    )
    .join("");
};

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  body.classList.toggle("nav-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    body.classList.remove("nav-open");
  });
});

keywordForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(keywordForm);
  const keyword = String(formData.get("keyword") || "").trim();

  if (!keyword) return;

  const exists = keywords.some((item) => item.toLowerCase() === keyword.toLowerCase());
  if (!exists) {
    keywords = [...keywords, keyword];
    storage.set("dealsnutKeywords", keywords);
    renderKeywords();
  }

  keywordForm.reset();
});

panelTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.panelTarget;
    panelTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === target));
  });
});

requestForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const request = {
      type: form.dataset.type || "Request",
      name: String(formData.get("name") || "Anonymous").trim(),
      need: String(formData.get("need") || "New request").trim(),
      details: String(formData.get("details") || "").trim(),
      contact: String(formData.get("contact") || "").trim(),
      createdAt: new Date().toISOString(),
    };

    requests = [...requests, request].slice(-18);
    storage.set("dealsnutRequests", requests);
    renderRequests();
    form.reset();
  });
});

clearRequests?.addEventListener("click", () => {
  requests = [];
  storage.set("dealsnutRequests", requests);
  renderRequests();
});

const applyLanguage = (language) => {
  languageButtons.forEach((item) =>
    item.classList.toggle("is-active", item.dataset.language === language)
  );
  if (languageSelect) languageSelect.value = language;
  if (languageNote) {
    languageNote.textContent =
      language === "Simple English"
        ? "Simple English is active for this first version."
        : `${language} is planned. Use the request form if you want this added sooner.`;
  }
};

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language));
});

languageSelect?.addEventListener("change", () => {
  applyLanguage(languageSelect.value);
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0.01,
  }
);

sections.forEach((section) => observer.observe(section));
renderKeywords();
renderRequests();

// Campaign countdown timer
function updateCountdown() {
  if (!countdownEl) return;
  const deadline = new Date(countdownEl.dataset.countdown + "T23:59:59+05:30");
  const now = new Date();
  const diff = deadline - now;
  if (diff <= 0) {
    countdownEl.textContent = "Order window has closed.";
    countdownEl.style.opacity = "0.6";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  countdownEl.textContent = `⏳ ${days}d ${hours}h ${mins}m remaining`;
  setTimeout(updateCountdown, 30 * 1000);
}
updateCountdown();
