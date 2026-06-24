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
