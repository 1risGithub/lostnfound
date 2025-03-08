// frontend/js/loading.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Loading screen started...");

  setTimeout(() => {
    console.log("Redirecting to home...");
    window.location.href = "./pages/home.html";
  }, 1500); // loading 1.5s
});
