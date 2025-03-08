document.addEventListener("DOMContentLoaded", () => {
  console.log("Loading screen started...");

  setTimeout(() => {
    console.log("Redirecting to home...");
    window.location.href = "./frontend/pages/home.html";
  }, 2000); // loading 1.5s
});
