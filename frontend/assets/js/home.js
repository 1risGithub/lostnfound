const BASE_URL = "http://localhost:4000";
const apiUrl = `${BASE_URL}/api/posts`;

// ==========================
// Load posts for Home Page
// ==========================
async function loadHomeContent() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = ""; // Clear previous content

  try {
    const endpoint = `${BASE_URL}/api/posts`;

    console.log(`📥 Fetching data from: ${endpoint}`);
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const posts = await res.json();

    if (posts.length === 0) {
      container.innerHTML = `
        <div class="text-center mt-4">
          <h5>No posts available 😢</h5>
        </div>
      `;
      return;
    }

    // ✅ Render post ในรูปแบบ Bootstrap card
    posts.forEach((post) => {
      const imageUrl = post.image
        ? `${BASE_URL}/uploads/${post.image}?timestamp=${new Date().getTime()}`
        : "";

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
              <div class="col-12 col-lg-4 d-flex justify-content-center align-items-center p-2">
                ${
                  post.image
                    ? `<img src="${imageUrl}" class="card-img-top" alt="${post.name}"
                        style="object-fit: contain; width: 100%; max-height: 389px; 
                        padding: 5px; border-radius: 12px; border: 2px solid #ddd; 
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); background-color: #f9f9f9;">`
                    : `<div class="card-img-top bg-light d-flex justify-content-center align-items-center"
                        style="height: 200px; border-radius: 12px; border: 2px solid #ddd; background-color: #f9f9f9;">
                        No image available</div>`
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
  } catch (err) {
    console.error(`🔥 Error loading content: ${err.message}`);
    container.innerHTML = `<h5>❌ Error loading content</h5>`;
  }
}

// ==========================
// Load initial home state
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  console.log(`🚀 Initial page: home`);
  loadHomeContent();
});
