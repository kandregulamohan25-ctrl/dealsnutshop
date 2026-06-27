// ============================================================
// DEALSNUT PRODUCT CATALOG
// To add a new product: copy one object inside the products array,
// change the details, and push to GitHub. That's it!
// ============================================================
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // ← Replace with your WhatsApp Business number

const products = [
  {
    id: 1,
    name: "Panda Silicone Night Light",
    price: 499,
    description: "Soft silicone panda night light with a warm glow. Features tap control, USB rechargeable battery, and comes with a cute striped scarf. Perfect for kids and cozy bedrooms.",
    category: "Home Decor",
    image: "assets/panda-light.png",
    available: true,
  }
];

function renderProducts(excludeId = null) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const filteredProducts = excludeId 
    ? products.filter(p => p.id !== excludeId)
    : products;

  if (filteredProducts.length === 0) {
    grid.innerHTML = `<p style="color: var(--muted); text-align:center; grid-column: 1/-1;">No products listed yet. Check back soon!</p>`;
    return;
  }

  grid.innerHTML = filteredProducts.map((p) => {
    const waText = encodeURIComponent(
      `Hi DealsNut! 🛍️ I want to order "${p.name}" for ₹${p.price}. Is it available? Please confirm!`
    );
    const igLink = `https://www.instagram.com/dealsnut_shop/`;
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
    const productLink = `product.html?id=${p.id}`;

    return `
    <article class="product-card ${!p.available ? "product-card--unavailable" : ""}">
      <a href="${productLink}" style="text-decoration:none; color:inherit;">
        <div class="product-image-wrap">
          <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy" />
          <span class="product-badge">${p.category}</span>
          ${!p.available ? `<div class="product-sold-out">Out of Stock</div>` : ""}
        </div>
      </a>
      <div class="product-info">
        <a href="${productLink}" style="text-decoration:none; color:inherit;">
          <h3 class="product-name">${p.name}</h3>
        </a>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">₹${p.price}</span>
          <div class="product-actions">
            <a class="btn-order btn-wa" href="${waLink}" target="_blank" rel="noreferrer" aria-label="Order via WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a class="btn-order btn-ig" href="${igLink}" target="_blank" rel="noreferrer" aria-label="Order via Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </article>`;
  }).join("");
}

renderProducts();

// ============================================================
// FREELANCER SERVICES BOARD — loads from Supabase
// ============================================================
let allServices = [];

async function loadServicesBoard() {
  const grid    = document.getElementById("services-grid");
  const empty   = document.getElementById("svc-empty");
  if (!grid) return;

  // Only load if Supabase is available
  if (typeof db === "undefined") {
    grid.innerHTML = `<p style="color:var(--muted);grid-column:1/-1;text-align:center;">Connect Supabase to display freelancer services.</p>`;
    return;
  }

  const { data, error } = await db
    .from("freelancer_services")
    .select("*, profiles(full_name)")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
    allServices = [];
    return;
  }

  allServices = data;
  renderServiceCards("all");
}

function renderServiceCards(cat) {
  const grid  = document.getElementById("services-grid");
  const empty = document.getElementById("svc-empty");
  if (!grid) return;

  const filtered = cat === "all"
    ? allServices
    : allServices.filter((s) => s.category === cat);

  if (filtered.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";
  grid.innerHTML = filtered.map((s) => {
    const freelancerName = s.profiles?.full_name || "Andaman Freelancer";
    const waText = encodeURIComponent(
      `Hi! I found your service "${s.title}" on DealsNut. I'm interested! Can we discuss?`
    );
    const waLink = s.contact_wa
      ? `https://wa.me/${s.contact_wa.replace(/\D/g,"")}?text=${waText}`
      : null;
    const igLink = `https://www.instagram.com/dealsnut_shop/`;

    const imagePart = s.image_url
      ? `<img src="${s.image_url}" alt="${s.title}" class="product-image" loading="lazy" onerror="this.style.display='none'" />`
      : `<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;">🎨</div>`;

    return `
    <article class="product-card">
      <div class="product-image-wrap">
        ${imagePart}
        <span class="product-badge">${s.category || "Service"}</span>
      </div>
      <div class="product-info">
        <div style="font-size:0.75rem;color:var(--muted);font-weight:600;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:2px;">By ${freelancerName}</div>
        <h3 class="product-name">${s.title}</h3>
        <p class="product-desc">${s.description || ""}</p>
        <div class="product-footer">
          <span class="product-price">${s.price ? "₹" + s.price + " <small style='font-size:0.65rem;font-weight:500;color:var(--muted);'>" + (s.price_label || "") + "</small>" : "Contact for price"}</span>
          <div class="product-actions">
            ${waLink ? `<a class="btn-order btn-wa" href="${waLink}" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>` : `<a class="btn-order btn-ig" href="${igLink}" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Contact
            </a>`}
          </div>
        </div>
      </div>
    </article>`;
  }).join("");
}

// Filter tab click handlers
document.querySelectorAll(".svc-filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".svc-filter-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderServiceCards(btn.dataset.cat);
  });
});

// "Register and list your service" link → open auth modal
document.getElementById("svc-register-link")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("auth-modal").style.display = "flex";
});

// Load on page init (after Supabase is ready)
window.addEventListener("load", () => {
  if (typeof db !== "undefined") loadServicesBoard();
});

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

// --- Supabase Authentication Logic ---
let isLoginMode = true;
const authNavBtn = document.getElementById("auth-nav-btn");
const authModal = document.getElementById("auth-modal");
const closeAuthModal = document.getElementById("close-auth-modal");
const authForm = document.getElementById("auth-form");
const authTitle = document.getElementById("auth-title");
const authSubmitBtn = document.getElementById("auth-submit-btn");
const authToggleBtn = document.getElementById("auth-toggle-btn");
const authToggleMsg = document.getElementById("auth-toggle-msg");
const authError = document.getElementById("auth-error");

// Toggle Modal — open immediately, no async needed
authNavBtn?.addEventListener("click", () => {
  const btnText = authNavBtn.textContent.trim();
  if (btnText === "Sign Out") {
    db.auth.signOut();
  } else if (btnText === "My Account") {
    window.location.href = "dashboard.html";
  } else {
    authModal.style.display = "flex";
  }
});

// Close on X button
closeAuthModal?.addEventListener("click", () => {
  authModal.style.display = "none";
});

// Close when clicking outside the modal box
authModal?.addEventListener("click", (e) => {
  if (e.target === authModal) {
    authModal.style.display = "none";
  }
});

// Switch between Login and Register
const registerFields = document.getElementById("register-fields");
authToggleBtn?.addEventListener("click", () => {
  isLoginMode = !isLoginMode;
  authTitle.textContent = isLoginMode ? "Sign In" : "Create Account";
  authSubmitBtn.textContent = isLoginMode ? "Sign In" : "Create Account";
  authToggleMsg.textContent = isLoginMode ? "Don't have an account?" : "Already have an account?";
  authToggleBtn.textContent = isLoginMode ? "Register here" : "Sign In";
  authError.style.display = "none";
  // Show/hide extra register fields
  registerFields.style.display = isLoginMode ? "none" : "flex";
});

// Handle Form Submit
authForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  authSubmitBtn.disabled = true;
  authSubmitBtn.textContent = "Loading...";
  authError.style.display = "none";

  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;

  try {
    if (isLoginMode) {
      // --- LOGIN ---
      const { error } = await db.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } else {
      // --- REGISTER ---
      const fullName = document.getElementById("auth-fullname").value.trim();
      const phone = document.getElementById("auth-phone").value.trim();
      const role = document.getElementById("auth-role").value;

      const { data, error } = await db.auth.signUp({ email, password });
      if (error) throw error;

      // Save extra profile info to the profiles table
      if (data?.user) {
        await db.from("profiles").upsert({
          id: data.user.id,
          full_name: fullName,
          phone: phone,
          role: role,
        });
      }

      // Show success if email confirmation is needed
      if (data?.user && data?.session === null) {
        authError.textContent = "✅ Account created! Check your email to confirm, then sign in.";
        authError.style.display = "block";
        authError.style.color = "var(--gold)";
        authSubmitBtn.disabled = false;
        authSubmitBtn.textContent = "Create Account";
        return;
      }
    }

    // Success — redirect to dashboard
    authModal.style.display = "none";
    authForm.reset();
    registerFields.style.display = "none";
    isLoginMode = true;
    authTitle.textContent = "Sign In";
    authSubmitBtn.textContent = "Sign In";
    authToggleMsg.textContent = "Don't have an account?";
    authToggleBtn.textContent = "Register here";
    window.location.href = "dashboard.html";

  } catch (err) {
    authError.textContent = err.message;
    authError.style.display = "block";
    authError.style.color = "var(--coral)";
  } finally {
    authSubmitBtn.disabled = false;
    authSubmitBtn.textContent = isLoginMode ? "Sign In" : "Create Account";
  }
});

// Listen for Auth State Changes
db.auth.onAuthStateChange((event, session) => {
  if (session) {
    authNavBtn.textContent = "My Account";
  } else {
    authNavBtn.textContent = "Sign In";
  }
});
