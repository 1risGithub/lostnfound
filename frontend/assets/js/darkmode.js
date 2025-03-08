const toggleMode = document.getElementById("toggleMode");

// Load theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  toggleMode.checked = true;
}

// Event for toggling theme
toggleMode.addEventListener("change", () => {
  if (toggleMode.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});
