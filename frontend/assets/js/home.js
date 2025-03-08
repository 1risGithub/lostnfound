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
    container.innerHTML = "";

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

  if (page === "home") {
    loadPosts(); // Load posts normally
  } else if (page === "search") {
    container.innerHTML = `<h2>🔎 Search Page</h2>`;
  } else if (page === "add") {
    container.innerHTML = `<h2>➕ Add Post Page</h2>`;
  } else if (page === "signup") {
    container.innerHTML = `<h2>👤 Signup/Login Page</h2>`;
  }
}

// ==========================
// 3. Set active footer icon
// ==========================
function setActiveNavLink(page) {
  document.querySelectorAll(".footer-icon").forEach((icon) => {
    icon.classList.remove("active");
  });

  const activeLink = document.getElementById(`${page}Link`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

// ==========================
// 4. Initialize
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || "home"; // Default to home

  switchPage(page);
  setActiveNavLink(page);
});

// ==========================
// 5. Change page without reload
// ==========================
function loadPage(page) {
  history.pushState(null, "", `?page=${page}`); // Change URL without reload
  switchPage(page);
  setActiveNavLink(page);
}

// ==========================
// 6. Handle back/forward browser buttons
// ==========================
window.addEventListener("popstate", () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || "home";

  switchPage(page);
  setActiveNavLink(page);
});
