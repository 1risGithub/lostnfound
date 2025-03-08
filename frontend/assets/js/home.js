const BASE_URL = "http://localhost:4000/api"; // Set in .env for easier modification

// ==========================
// 1. Load posts function
// ==========================
async function loadPosts() {
  try {
    const res = await fetch(`${BASE_URL}/posts`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const posts = await res.json();

    const container = document.getElementById("cardContainer");
    container.innerHTML = ""; // ✅ Clear old content before loading new posts

    posts.forEach((post) => {
      const card = `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.description}</p>
            <small class="text-muted">${post.date}</small>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  } catch (err) {
    console.error("Error loading posts:", err);
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

    // ✅ ให้ setActiveNavLink ทำงานเร็วขึ้นด้วย setTimeout
    setTimeout(() => {
      switchPage(event.state.page);
    }, 10); // ✅ Delay เล็กน้อยเพื่อให้ browser อัปเดต state ก่อน
  }
});
