// ดึง query parameter จาก URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || "Not Available";
}

// โหลดข้อมูลเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOMContentLoaded triggered");

  const postImage = document.getElementById("postImage");
  const postTitle = document.getElementById("postTitle");
  const postSubtitle = document.getElementById("postSubtitle");
  const postDate = document.getElementById("postDate");
  const postLocation = document.getElementById("postLocation");
  const postPostedDateTime = document.getElementById("postPostedDateTime");

  console.log("Title:", getQueryParam("title"));
  console.log("Image URL:", getQueryParam("image"));
  console.log("Subtitle:", getQueryParam("subtitle"));
  console.log("Date:", getQueryParam("date"));
  console.log("Location:", getQueryParam("location"));
  console.log("Posted DateTime:", getQueryParam("postedDateTime"));

  if (postImage) {
    const imageUrl =
      getQueryParam("image") !== "Not Available"
        ? `/image/${getQueryParam("image")}`
        : "/image/default.jpg";
    postImage.src = imageUrl;
  }

  if (postTitle) postTitle.textContent = getQueryParam("title");
  if (postSubtitle) postSubtitle.textContent = getQueryParam("subtitle");
  if (postDate) postDate.textContent = getQueryParam("date");
  if (postLocation) postLocation.textContent = getQueryParam("location");
  if (postPostedDateTime)
    postPostedDateTime.textContent = getQueryParam("postedDateTime");
});

// การจัดการ Contact Section
const isLoggedIn = false;
const contactButton = document.getElementById("contactButton");
const contactBox = document.getElementById("contactBox");
const dialog = document.getElementById("dialog");
const backdrop = document.getElementById("backdrop");

function toggleContact() {
  contactBox.classList.toggle("d-none");
  contactButton.style.visibility = contactBox.classList.contains("d-none")
    ? "visible"
    : "hidden";
}

function showDialog() {
  dialog.classList.remove("d-none");
  backdrop.classList.remove("d-none");
}

function hideDialog() {
  dialog.classList.add("d-none");
  backdrop.classList.add("d-none");
}

function goToLogin() {
  window.location.href = "signup_login.html";
  hideDialog();
}

if (contactButton) {
  contactButton.onclick = isLoggedIn ? toggleContact : showDialog;
}

if (backdrop) {
  backdrop.addEventListener("click", hideDialog);
}
