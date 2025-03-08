// ==========================
// Load profile content
// ==========================
async function loadProfilePage() {
  console.log("📄 Loading Profile Page");

  const container = document.getElementById("cardContainer");
  container.innerHTML = `
      <div class="container mt-4">
        <h2>User Profile</h2>
        <p>Welcome, <span id="username">[USERNAME]</span></p>
        <button class="btn btn-danger" onclick="logout()">Logout</button>
      </div>
    `;

  // ✅ ตัวอย่าง: ดึงชื่อผู้ใช้จาก API
  try {
    const res = await fetch(`${BASE_URL}/api/user`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const user = await res.json();
    document.getElementById("username").innerText = user.username || "Guest";
  } catch (err) {
    console.error(`🔥 Error fetching user: ${err.message}`);
    document.getElementById("username").innerText = "Guest";
  }
}

// ==========================
// Logout function
// ==========================
function logout() {
  console.log("🚪 Logging out...");
  // ✅ ตัวอย่าง: ลบ token หรือ session ออกจาก localStorage
  localStorage.removeItem("token");
  window.location.href = "?page=home";
}
