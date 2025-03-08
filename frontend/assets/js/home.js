const BASE_URL = "http://localhost:4000";

// ==========================
// 1. Load posts function
// ==========================
async function loadPosts() {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const posts = await res.json();

    const container = document.getElementById("cardContainer");
    container.innerHTML = ""; // Clear any existing posts

    posts.forEach((post) => {
      const imageUrl = post.image
        ? `${BASE_URL}/uploads/${post.image}?timestamp=${new Date().getTime()}`
        : ""; // If no image, leave it empty

      console.log("🖼️ Final Image URL:", imageUrl);

      const formattedDate = post.date
        ? new Date(post.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "Unknown date";

      const card = `
  <div class="col-12 col-sm-6 col-md-4 col-lg-6">
    <div class="card h-100">
      <div class="row g-0">
        <!-- Image Left (Left on large screens, top on small screens) -->
        <div class="col-12 col-lg-4" style="padding-left: 10px;">
          ${
            post.image
              ? `<img src="${imageUrl}" class="card-img-top" alt="${post.name}" style="object-fit: cover; width: 100%; max-height: 389px;">`
              : `<div class="card-img-top bg-light" style="height: 200px; display: flex; justify-content: center; align-items: center;">No image available</div>`
          }
        </div>
        <!-- Data Right (Right on large screens, below image on small screens) -->
        <div class="col-12 col-lg-8">
          <div class="card-body">
            <h5 class="card-title">${post.name}</h5>
            <p class="card-text">${post.description}</p>
            <small class="text-muted">${formattedDate}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
      container.innerHTML += card; // Append the card to the container
    });
  } catch (err) {
    console.error("🔥 Error loading posts:", err.message);
  }
}

// ==========================
// 2. Switch content based on query string
// ==========================
function switchPage(page) {
  const container = document.getElementById("cardContainer");

  // ✅ Clear previous content before switching pages
  container.innerHTML = "";

  if (page === "home") {
    loadPosts(); // ✅ Load posts for home page
  } else if (page === "search") {
    container.innerHTML = `<h2>🔎 Search Page</h2>`;
  } else if (page === "add") {
    container.innerHTML = `<h2>➕ Add Post Page</h2>`;
  } else if (page === "signup") {
    container.innerHTML = `<h2>👤 Signup/Login Page</h2>`;
  } else {
    container.innerHTML = `<h2>❌ Page Not Found</h2>`;
  }

  // ✅ Update active state immediately
  setActiveNavLink(page);
}

// ==========================
// 3. Set active footer icon
// ==========================
function setActiveNavLink(page) {
  // ✅ Clear active class from all footer icons
  document.querySelectorAll(".footer-icon").forEach((icon) => {
    icon.classList.remove("active");
  });

  // ✅ Add active class to the current page link
  const activeLink = document.getElementById(`${page}Link`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

// ==========================
// 4. Load initial page state
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || "home";

  // ✅ Use replaceState for initial load
  history.replaceState({ page }, "", `?page=${page}`);
  switchPage(page);
});

// ==========================
// 5. Change page without reload
// ==========================
function loadPage(page) {
  const currentPage = new URLSearchParams(window.location.search).get("page");

  if (currentPage !== page) {
    // ✅ Push new state only if different from current state
    history.pushState({ page }, "", `?page=${page}`);
    switchPage(page);
  }
}

// ==========================
// 6. Handle back/forward browser buttons
// ==========================
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.page) {
    console.log(`🔙 Back/Forward to: ${event.state.page}`);
    switchPage(event.state.page);
  }
});
