const apiUrl = "/api/posts";
const postId = new URLSearchParams(window.location.search).get("id");

const loadPostDetail = async () => {
  try {
    if (!postId) {
      alert("Invalid post ID");
      window.location.href = "./home.html";
      return;
    }

    const res = await fetch(`${apiUrl}?id=${postId}`);
    const data = await res.json();

    if (!data || data.length === 0) {
      alert("Post not found");
      window.location.href = "./home.html";
      return;
    }

    const post = data[0];
    document.getElementById("post-title").textContent = post.name;
    document.getElementById("post-description").textContent =
      post.description || "No description available";
    document.getElementById("post-location").querySelector("span").textContent =
      post.location || "Unknown location";
    document.getElementById("post-date").querySelector("span").textContent =
      post.date || "Unknown date";

    // ถ้าไม่มีรูปให้แสดง placeholder
    document.getElementById("post-image").src =
      post.image || "https://via.placeholder.com/600x300?text=No+Image";

    // ✅ Report post
    document
      .getElementById("btn-report")
      .addEventListener("click", async () => {
        const reason = prompt("Please enter the reason for reporting:");
        if (reason) {
          await reportPost(postId, reason);
        }
      });

    // ✅ Request contact
    document
      .getElementById("btn-request-contact")
      .addEventListener("click", async () => {
        alert("Request Contact feature not implemented yet!");
      });
  } catch (err) {
    console.error("Failed to load post:", err);
  }
};

loadPostDetail();
