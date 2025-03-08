async function performSearch() {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  try {
    const res = await fetch(
      `${BASE_URL}/api/search?q=${encodeURIComponent(query)}`
    );
    const results = await res.json();

    const container = document.getElementById("searchResults");
    container.innerHTML = results.map((item) => `<p>${item.name}</p>`).join("");
  } catch (err) {
    console.error(`🔥 Error searching: ${err.message}`);
  }
}
