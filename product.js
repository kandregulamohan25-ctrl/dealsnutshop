// ============================================================
// DealsNut — Single Product Page Logic
// Reads ?id= from URL and renders the specific product
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"), 10);
  const wrapper = document.getElementById("pdp-wrapper");

  if (!productId || isNaN(productId)) {
    wrapper.innerHTML = `<div style="text-align:center; padding: 100px 20px;"><h2>Product not found</h2><a href="index.html" style="color:var(--gold);">Go back to Shop</a></div>`;
    return;
  }

  // products array comes from script.js which is loaded before this file
  const product = products.find(p => p.id === productId);

  if (!product) {
    wrapper.innerHTML = `<div style="text-align:center; padding: 100px 20px;"><h2>Product not found</h2><a href="index.html" style="color:var(--gold);">Go back to Shop</a></div>`;
    return;
  }

  const fbLink = `https://www.facebook.com/dealsnut_shop`;
  const igLink = `https://www.instagram.com/dealsnut_shop/`;

  const originalPrice = product.price * 2; // Fake compare-at price
  
  // Build thumbnails html
  let thumbHtml = '';
  if (product.images && product.images.length > 0) {
    thumbHtml = product.images.map((img, idx) => `
      <div class="pdp-thumb ${idx === 0 ? 'active' : ''}" onclick="swapImage('${img}', this)">
        <img src="${img}" alt="Thumbnail ${idx+1}">
      </div>
    `).join('');
  }

  wrapper.innerHTML = `
    <div class="pdp-container">
      <div class="pdp-gallery">
        <div class="pdp-image-main-wrap">
          <img src="${product.images ? product.images[0] : ''}" alt="${product.name}" class="pdp-image-main" id="main-image" />
          <span class="pdp-badge">${product.category}</span>
        </div>
        <div class="pdp-thumbnails">
          ${thumbHtml}
        </div>
      </div>
      
      <div class="pdp-info">
        <div class="pdp-reviews">
          <span class="pdp-stars">★★★★★</span>
          <span>4.9 (124 reviews)</span>
        </div>
        
        <h1 class="pdp-title">${product.name}</h1>
        
        <div class="pdp-price-wrap">
          <span class="pdp-price">₹${product.price}</span>
          <span class="pdp-price-compare">₹${originalPrice}</span>
          <span class="pdp-discount-badge">50% OFF</span>
        </div>
        
        <p class="pdp-desc">${product.description}</p>
        
        <ul class="pdp-features">
          <li><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Premium Quality Material</li>
          <li><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Fast & Free Delivery Options</li>
          <li><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 100% Satisfaction Guaranteed</li>
        </ul>
        
        <div class="pdp-actions">
          ${product.available ? `
            <a href="${fbLink}" target="_blank" rel="noreferrer" class="btn-massive btn-massive-fb">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Buy on Facebook
            </a>
          ` : `
            <div style="padding: 16px; background: rgba(255,255,255,0.05); color: var(--muted); border-radius: 12px; text-align: center; font-weight: 700; font-size: 1.1rem;">
              Currently Out of Stock
            </div>
          `}
        </div>

        <div class="trust-badges">
          <div class="trust-badge">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            <span>Fast<br>Shipping</span>
          </div>
          <div class="trust-badge">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <span>Secure<br>Payment</span>
          </div>
          <div class="trust-badge">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            <span>Satisfaction<br>Guarantee</span>
          </div>
        </div>

        <!-- Accordions -->
        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span>Description</span>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s ease;"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div class="accordion-content">
            <p>${product.description}</p>
          </div>
        </div>
        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span>Shipping & Delivery</span>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s ease;"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div class="accordion-content">
            <p>We process all orders within 24 hours. Standard shipping takes 3-5 business days across India.</p>
          </div>
        </div>

      </div>
    </div>
  `;

  if (typeof renderProducts === "function") {
    renderProducts(productId);
  }
});

// Helper for image gallery swap
window.swapImage = function(src, el) {
  const mainImg = document.getElementById("main-image");
  if (mainImg) {
    mainImg.style.opacity = 0;
    setTimeout(() => {
      mainImg.src = src;
      mainImg.style.opacity = 1;
    }, 150);
  }
  
  // Update active state
  document.querySelectorAll(".pdp-thumb").forEach(t => t.classList.remove("active"));
  if(el) el.classList.add("active");
};

// Helper for accordion toggle
window.toggleAccordion = function(el) {
  const accordion = el.parentElement;
  accordion.classList.toggle("open");
};
