document.addEventListener("DOMContentLoaded", () => {
  console.log("Loading screen started...");

  setTimeout(() => {
    console.log("Redirecting to home...");
    window.location.href = "./frontend/pages/home.html";
  }, 3000); // loading 3s
});
