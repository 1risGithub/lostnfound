document.addEventListener("DOMContentLoaded", function () {
  const toggleMode = document.getElementById("toggleMode");

  // Set the theme from localStorage or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleMode.checked = currentTheme === "dark";

  // Toggle the theme when the checkbox is clicked
  toggleMode.addEventListener("change", function () {
    const newTheme = toggleMode.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
});
