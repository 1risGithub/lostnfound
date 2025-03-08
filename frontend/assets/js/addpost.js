// ==========================
// Load add content
// ==========================
function loadAddPage() {
  console.log("📄 Loading Add Page");
  const container = document.getElementById("cardContainer");
  container.innerHTML = `
      <div class="container mt-4">
        <h2>Add New Post</h2>
        <form>
          <input type="text" class="form-control" placeholder="Item name" />
          <textarea class="form-control mt-2" placeholder="Description"></textarea>
          <button type="submit" class="btn btn-primary mt-2">Submit</button>
        </form>
      </div>
    `;
}

// Load content on page load
document.addEventListener("DOMContentLoaded", () => {
  loadAddPage();
});
