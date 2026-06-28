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
<!-- UniSeoul Aesthetic Product Section -->
<section class="premium-product-container">
    <div class="uniseoul-grid">
        
        <!-- Left Side: Large Visual Component -->
        <div class="visual-gallery">
            <div class="hero-frame">
                <img src="${product.images ? product.images[0] : ''}" id="main-display" alt="${product.name}">
                <!-- Video Mini Thumbnail as seen in UniSeoul -->
                <div class="video-badge">
                    <span class="play-icon">▶</span>
                    <p>WATCH IT IN ACTION</p>
                </div>
            </div>
            <div class="pdp-thumbnails" style="margin-top: 16px;">
              ${thumbHtml}
            </div>
        </div>
        
        <!-- Right Side: Clean E-Commerce Details Panel -->
        <div class="details-panel">
            <div class="meta-header" style="color: #004d40; font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; letter-spacing: 0.5px;">
                <span class="stars" style="color: #FFB800;">★★★★★</span>
                <span class="sales-count" style="margin-left: 8px;">4.9 STARS | 300+ HAPPY CUTIES</span>
            </div>
            
            <h1 class="item-title" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: #161716; margin: 0 0 16px; line-height: 1.1;">${product.name}</h1>
            
            <div class="price-row" style="margin-bottom: 24px;">
                <span class="price-tag" style="font-size: 2rem; font-weight: 800; color: #004d40;">Rs. ${product.price}</span>
                <span class="price-compare" style="font-size: 1.2rem; color: #9e9e9e; text-decoration: line-through; margin-left: 12px; font-weight: 600;">MRP Rs. ${originalPrice}</span>
                <div class="tax-info" style="font-size: 0.85rem; color: #9e9e9e; margin-top: 4px;">* Inclusive Of All Taxes</div>
            </div>
            
            <!-- Clean Specs Grid -->
            <div class="specs-table-box">
                <h3 class="box-label" style="font-size: 0.9rem; margin-top: 0; margin-bottom: 16px; color: #004d40;">SPECIFICATION</h3>
                <div class="specs-inner-grid">
                    <div class="spec-cell">
                        <span class="label">Material</span>
                        <span class="value">SILICONE</span>
                    </div>
                    <div class="spec-cell">
                        <span class="label">Dimensions</span>
                        <span class="value">10.9 x 9.5 x 10.5 CM</span>
                    </div>
                    <div class="spec-cell">
                        <span class="label">Color</span>
                        <span class="value">WHITE</span>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div style="margin-top: 32px;">
              ${product.available ? `
                <a href="${igLink}" target="_blank" rel="noreferrer" class="btn-massive" style="background: #E1306C; color: #fff; text-decoration: none; padding: 18px; border-radius: 12px; display: flex; justify-content: center; align-items: center; gap: 10px; font-weight: 800; font-size: 1.15rem; text-transform: uppercase;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Order via Instagram DM
                </a>
              ` : `
                <div style="padding: 16px; background: rgba(0,0,0,0.05); color: #9e9e9e; border-radius: 12px; text-align: center; font-weight: 700; font-size: 1.1rem;">
                  Currently Out of Stock
                </div>
              `}
            </div>

            <!-- Localized Destination Banner -->
            <div class="island-shipping-bar">
                <p>✈️ <strong>July 5th Mainland Drop:</strong> Arriving in Port Blair next week! Reserve yours via DM for local pickup in Pather Gudda on July 6th.</p>
            </div>
            
        </div>
    </div>
</section>
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
