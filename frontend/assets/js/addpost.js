const initAddPost = () => {
  console.log("🔥 addpost.js loaded");

  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    console.log("🚀 Found #submitBtn");
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addPost();
    });
  } else {
    console.log("❌ Element with ID 'submitBtn' not found");
  }
};

const addPost = () => {
  console.log("📤 Submitting post...");

  const formData = new FormData();
  formData.append("name", document.getElementById("nameInput").value);
  formData.append("image", document.getElementById("imageInput").files[0]);
  formData.append(
    "description",
    document.getElementById("descriptionInput").value
  );
  formData.append("date", document.getElementById("date").value);
  formData.append("location", document.getElementById("locationInput").value);

  fetch("/api/addpost", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("✅ Post success:", data);

      const postModal = new bootstrap.Modal(
        document.getElementById("postModal")
      );
      postModal.show();

      document.getElementById("goToPost").addEventListener("click", () => {
        loadPage(`post?id=${data.postId}`);
      });
    })
    .catch((err) => console.log("❌ Error submitting post:", err));
};
