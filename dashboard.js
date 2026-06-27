// ============================================================
// DealsNut — Dashboard Logic
// Loads user profile and orders from Supabase
// ============================================================

const loadingState   = document.getElementById("loading-state");
const dashboardMain  = document.getElementById("dashboard-main");
const dashSignoutBtn = document.getElementById("dash-signout-btn");

// --- Auth Guard: redirect to home if not logged in ---
db.auth.getSession().then(({ data: { session } }) => {
  if (!session) {
    window.location.href = "index.html";
    return;
  }
  loadDashboard(session.user);
});

async function loadDashboard(user) {
  loadingState.style.display   = "none";
  dashboardMain.style.display  = "block";

  // Show email
  document.getElementById("dash-email-display").textContent = user.email;

  // Fetch profile from Supabase
  const { data: profile } = await db
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile) {
    const name  = profile.full_name || "Friend";
    const phone = profile.phone     || "Not set";
    const role  = profile.role      || "customer";

    // Welcome header
    document.getElementById("dash-name").textContent = name.split(" ")[0];

    // Role badge
    const badge = document.getElementById("dash-role-badge");
    badge.textContent = role.charAt(0).toUpperCase() + role.slice(1);
    if (role === "freelancer") badge.classList.add("freelancer");

    // Profile view
    document.getElementById("view-name").textContent  = name;
    document.getElementById("view-phone").textContent = phone;
    document.getElementById("view-role").textContent  =
      role === "freelancer" ? "Freelancer / Student" : "Customer";

    // Pre-fill edit form
    document.getElementById("edit-name").value  = profile.full_name  || "";
    document.getElementById("edit-phone").value = profile.phone      || "";
    document.getElementById("edit-role").value  = profile.role       || "customer";

    // Show freelancer section if role is freelancer
    if (role === "freelancer") {
      document.getElementById("freelancer-section").style.display = "block";
      loadMyServices(user.id);
    }
    
    // Show admin section if role is admin
    if (role === "admin") {
      document.getElementById("admin-section").style.display = "block";
      loadAdminPanel();
    }
  }

  // Load orders
  loadOrders(user.id);
}

// --- Edit / Save Profile ---
const editProfileBtn   = document.getElementById("edit-profile-btn");
const profileView      = document.getElementById("profile-view");
const profileEditForm  = document.getElementById("profile-edit-form");
const saveProfileMsg   = document.getElementById("save-profile-msg");

editProfileBtn?.addEventListener("click", () => {
  const editing = profileEditForm.style.display === "flex" || profileEditForm.style.display === "block";
  profileView.style.display       = editing ? "block" : "none";
  profileEditForm.style.display   = editing ? "none"  : "block";
  editProfileBtn.textContent      = editing ? "Edit"  : "Cancel";
});

profileEditForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { data: { session } } = await db.auth.getSession();
  if (!session) return;

  const newName  = document.getElementById("edit-name").value.trim();
  const newPhone = document.getElementById("edit-phone").value.trim();
  const newRole  = document.getElementById("edit-role").value;

  const { error } = await db.from("profiles").upsert({
    id:        session.user.id,
    full_name: newName,
    phone:     newPhone,
    role:      newRole,
  });

  if (error) {
    saveProfileMsg.textContent = "❌ Error saving: " + error.message;
    saveProfileMsg.style.color = "#ff5050";
  } else {
    saveProfileMsg.textContent = "✅ Profile updated!";
    saveProfileMsg.style.color = "#00c864";

    // Update view
    document.getElementById("view-name").textContent  = newName  || "—";
    document.getElementById("view-phone").textContent = newPhone || "—";
    document.getElementById("view-role").textContent  =
      newRole === "freelancer" ? "Freelancer / Student" : "Customer";

    document.getElementById("dash-name").textContent = (newName || "Friend").split(" ")[0];

    const badge = document.getElementById("dash-role-badge");
    badge.textContent = newRole.charAt(0).toUpperCase() + newRole.slice(1);
    badge.classList.toggle("freelancer", newRole === "freelancer");

    setTimeout(() => {
      profileView.style.display     = "block";
      profileEditForm.style.display = "none";
      editProfileBtn.textContent    = "Edit";
      saveProfileMsg.style.display  = "none";
    }, 1500);
  }

  saveProfileMsg.style.display = "block";
});

// --- Load Orders ---
async function loadOrders(userId) {
  const ordersList = document.getElementById("orders-list");

  const { data: orders, error } = await db
    .from("orders")
    .select("*")
    .eq("customer_id", userId)
    .order("created_at", { ascending: false });

  if (error || !orders || orders.length === 0) {
    ordersList.innerHTML = `
      <div class="empty-state">
        No orders yet! <a href="index.html#shop" style="color: var(--gold); font-weight:700;">Browse the shop</a> and place your first order.
      </div>`;
    return;
  }

  ordersList.innerHTML = orders.map((o) => `
    <div class="order-item">
      <div>
        <div class="order-name">${o.product_name || "Product"}</div>
        <div style="font-size:0.78rem; color: var(--muted);">
          ${new Date(o.created_at).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
        </div>
      </div>
      <span class="order-price">₹${o.price_at_order || "—"}</span>
      <span class="order-status ${o.status}">${o.status}</span>
    </div>
  `).join("");
}

// --- Sign Out ---
dashSignoutBtn?.addEventListener("click", async () => {
  await db.auth.signOut();
  window.location.href = "index.html";
});

// --- Freelancer: Load My Services ---
async function loadMyServices(userId) {
  const list = document.getElementById("my-services-list");

  const { data: services, error } = await db
    .from("freelancer_services")
    .select("*")
    .eq("freelancer_id", userId)
    .order("created_at", { ascending: false });

  if (error || !services || services.length === 0) {
    list.innerHTML = `<div class="empty-state">No services listed yet. Click "+ List New Service" to get started!</div>`;
    return;
  }

  const statusColors = {
    pending:  { bg: "rgba(255,200,0,0.12)",  color: "#ffc800" },
    approved: { bg: "rgba(0,200,100,0.12)",  color: "#00c864" },
    rejected: { bg: "rgba(255,80,80,0.12)",  color: "#ff5050" },
  };

  list.innerHTML = services.map((s) => {
    const sc = statusColors[s.status] || statusColors.pending;
    return `
    <div class="order-item" style="align-items:flex-start; flex-direction:column; gap:10px;">
      <div style="display:flex; justify-content:space-between; width:100%; flex-wrap:wrap; gap:8px;">
        <div>
          <div class="order-name">${s.title}</div>
          <div style="font-size:0.78rem; color:var(--muted);">${s.category || ""} ${s.price ? "· ₹" + s.price + " " + (s.price_label || "") : ""}</div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <span style="font-size:0.72rem; font-weight:700; padding:3px 10px; border-radius:20px; background:${sc.bg}; color:${sc.color}; text-transform:uppercase; letter-spacing:0.06em;">
            ${s.status}
          </span>
          <button onclick="deleteService(${s.id})" style="background:transparent; border:1px solid var(--line); border-radius:6px; color:var(--coral); cursor:pointer; font-size:0.75rem; font-weight:700; padding:3px 10px;">Delete</button>
        </div>
      </div>
      <p style="font-size:0.82rem; color:var(--muted); margin:0;">${s.description || ""}</p>
      ${s.status === "pending" ? `<small style="color:var(--muted); font-size:0.75rem;">⏳ Waiting for admin approval before going live on the site.</small>` : ""}
      ${s.status === "rejected" ? `<small style="color:#ff5050; font-size:0.75rem;">❌ This listing was not approved. Please edit and resubmit or contact DealsNut.</small>` : ""}
    </div>`;
  }).join("");
}

// --- Freelancer: Toggle Service Form ---
document.getElementById("toggle-service-form-btn")?.addEventListener("click", () => {
  const form = document.getElementById("service-form");
  const isVisible = form.style.display === "block";
  form.style.display = isVisible ? "none" : "block";
  document.getElementById("toggle-service-form-btn").textContent = isVisible ? "+ List New Service" : "✕ Cancel";
});

// --- Freelancer: Submit New Service ---
document.getElementById("service-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = document.getElementById("svc-form-msg");
  const btn = e.target.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Submitting…";
  msg.style.display = "none";

  const { data: { session } } = await db.auth.getSession();
  if (!session) return;

  const { error } = await db.from("freelancer_services").insert({
    freelancer_id: session.user.id,
    title:         document.getElementById("svc-title").value.trim(),
    description:   document.getElementById("svc-desc").value.trim(),
    category:      document.getElementById("svc-category").value,
    price:         parseFloat(document.getElementById("svc-price").value) || null,
    price_label:   document.getElementById("svc-price-label").value,
    contact_wa:    document.getElementById("svc-wa").value.trim(),
    image_url:     document.getElementById("svc-image").value.trim(),
    status:        "pending",
  });

  if (error) {
    msg.textContent = "❌ Error: " + error.message;
    msg.style.color = "#ff5050";
  } else {
    msg.textContent = "✅ Submitted! DealsNut will review and approve your listing soon.";
    msg.style.color = "#00c864";
    e.target.reset();
    setTimeout(() => {
      document.getElementById("service-form").style.display = "none";
      document.getElementById("toggle-service-form-btn").textContent = "+ List New Service";
      loadMyServices(session.user.id);
    }, 2000);
  }

  msg.style.display = "block";
  btn.disabled = false;
  btn.textContent = "Submit for Approval";
});

// --- Freelancer: Delete a Service ---
async function deleteService(serviceId) {
  if (!confirm("Are you sure you want to delete this service listing?")) return;
  const { error } = await db.from("freelancer_services").delete().eq("id", serviceId);
  if (!error) {
    const { data: { session } } = await db.auth.getSession();
    if (session) loadMyServices(session.user.id);
  }
}

// --- Admin: Load Pending Services ---
async function loadAdminPanel() {
  const list = document.getElementById("admin-services-list");
  
  const { data: services, error } = await db
    .from("freelancer_services")
    .select("*, profiles(full_name)")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error || !services || services.length === 0) {
    list.innerHTML = `<div class="empty-state">No pending approvals! You are all caught up.</div>`;
    return;
  }

  list.innerHTML = services.map((s) => {
    return `
    <div class="order-item" style="align-items:flex-start; flex-direction:column; gap:10px; border-left: 3px solid var(--coral);">
      <div style="display:flex; justify-content:space-between; width:100%; flex-wrap:wrap; gap:8px;">
        <div>
          <div class="order-name">${s.title} <span style="color:var(--muted); font-weight:500;">by ${s.profiles?.full_name || 'Unknown'}</span></div>
          <div style="font-size:0.78rem; color:var(--muted);">
            ${s.category || ""} ${s.price ? "· ₹" + s.price + " " + (s.price_label || "") : ""}
          </div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <button onclick="updateServiceStatus(${s.id}, 'approved')" class="button button--primary" style="padding: 4px 12px; font-size: 0.75rem;">Approve</button>
          <button onclick="updateServiceStatus(${s.id}, 'rejected')" style="background:transparent; border:1px solid var(--line); border-radius:6px; color:var(--coral); cursor:pointer; font-size:0.75rem; font-weight:700; padding:4px 12px;">Reject</button>
        </div>
      </div>
      <p style="font-size:0.82rem; color:var(--muted); margin:0;">${s.description || ""}</p>
    </div>`;
  }).join("");
}

// --- Admin: Approve/Reject Service ---
async function updateServiceStatus(serviceId, newStatus) {
  const { error } = await db
    .from("freelancer_services")
    .update({ status: newStatus })
    .eq("id", serviceId);

  if (!error) {
    loadAdminPanel(); // Refresh the list
  } else {
    alert("Error updating status: " + error.message);
  }
}
