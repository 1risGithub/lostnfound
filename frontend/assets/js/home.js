const BASE_URL = "http://localhost:4000/api"; // ให้ตั้งในไฟล์ .env ถ้าอยากแก้ง่าย

// ==========================
// 1. Function to load posts
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
// 2. Set active footer icon
// ==========================
function setActiveNavLink() {
  const path = window.location.pathname.split("/").pop();
  document.querySelectorAll(".footer-icon").forEach((icon) => {
    icon.classList.remove("active");
  });
  document
    .getElementById(`${path.replace(".html", "Link")}`)
    .classList.add("active");
}

// ==========================
// 3. Initialize
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();
  loadPosts();
});
