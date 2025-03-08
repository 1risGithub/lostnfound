document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("cardContainer");

  // Fetch data from API
  async function loadPosts() {
    try {
      const res = await fetch("/API/posts"); // Call API from backend
      const data = await res.json();

      cardContainer.innerHTML = ""; // Clear data before displaying

      data.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.className = "col-md-4";
        postCard.innerHTML = `
                    <div class="post-card">
                        <img src="${post.image}" alt="${post.title}" />
                        <div class="p-3">
                            <h5>${post.title}</h5>
                            <p>${post.description}</p>
                            <a href="post.html?id=${post.id}" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                `;
        cardContainer.appendChild(postCard);
      });
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }

  loadPosts(); // Call the data loading function
});

// Highlight active link in footer
const currentPage = new URLSearchParams(window.location.search).get("page");

document.querySelectorAll(".footer-icon").forEach((link) => {
  if (link.getAttribute("href") === `?page=${currentPage}`) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
