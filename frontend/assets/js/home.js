const BASE_URL = "http://localhost:4000";

// ==========================
// 1. Load page content or posts
// ==========================
async function loadPageContent(page, query = "") {
  const container = document.getElementById("cardContainer");
  container.innerHTML = ""; // Clear previous content

  try {
    if (page === "home" || page === "search") {
      // ✅ If page is "home" or "search", fetch data from API
      const endpoint = query
        ? `${BASE_URL}/api/search?q=${encodeURIComponent(query)}`
        : `${BASE_URL}/api/posts`;

      console.log(`📥 Fetching data from: ${endpoint}`);
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const posts = await res.json();

      // ✅ If no data found
      if (posts.length === 0) {
        container.innerHTML = `
          <div class="text-center mt-4">
            <h5>No results found for "${query}" 😢</h5>
          </div>
        `;
        return;
      }

      // ✅ Render each post in a Bootstrap card
      posts.forEach((post) => {
        const imageUrl = post.image
          ? `${BASE_URL}/uploads/${
              post.image
            }?timestamp=${new Date().getTime()}`
          : ""; // Handle missing image

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
                <div class="col-12 col-lg-4" style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 10px;
                ">
                  ${
                    post.image
                      ? `<img src="${imageUrl}" class="card-img-top" alt="${post.name}" 
                          style="object-fit: contain; width: 100%; max-height: 389px; 
                          padding: 5px; border-radius: 12px; border: 2px solid #ddd; 
                          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); background-color: #f9f9f9;">`
                      : `<div class="card-img-top bg-light" style="
                          height: 200px; 
                          display: flex; 
                          justify-content: center; 
                          align-items: center;
                          border-radius: 12px;
                          border: 2px solid #ddd;
                          background-color: #f9f9f9;
                        ">No image available</div>`
                  }
                </div>
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

        container.innerHTML += card;
      });
    } else {
      // ✅ If it's a static page (add or profile), load HTML file
      console.log(`📄 Loading: ../pages/${page}.html`);
      const response = await fetch(`../pages/${page}.html`);
      if (!response.ok) throw new Error(`Failed to load ${page}.html`);

      const content = await response.text();
      container.innerHTML = content;
    }
  } catch (err) {
    console.error(`🔥 Error loading content: ${err.message}`);
    container.innerHTML = `<h5>❌ Error loading content</h5>`;
  }
}

// ==========================
// 2. Switch content based on query string
// ==========================
function switchPage(page) {
  console.log(`🔄 Switching to: ${page}`);
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  if (page === "home") {
    loadPageContent("home");
  } else if (page === "search") {
    const query = new URLSearchParams(window.location.search).get("q");
    loadPageContent("search", query);
  } else if (page === "add") {
    loadPageContent("add");
  } else if (page === "profile") {
    loadPageContent("profile");
  } else {
    container.innerHTML = `<h2 style="color: red;">❌ Oops! Page Not Found</h2>`;
  }
  setActiveNavLink(page);
}

// ==========================
// 3. Set active footer icon
// ==========================
function setActiveNavLink(page) {
  // Remove 'active' class from all footer icons
  document.querySelectorAll(".footer-icon").forEach((icon) => {
    icon.classList.remove("active");
  });

  // Add 'active' class to the selected page's icon
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

  console.log(`🚀 Initial page: ${page}`);

  history.replaceState({ page }, "", `?page=${page}`);
  switchPage(page);
});

// ==========================
// 5. Change page without reload
// ==========================
function loadPage(page) {
  const currentPage = new URLSearchParams(window.location.search).get("page");

  if (currentPage !== page) {
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
