// 1. Function to load posts from API
async function loadPosts() {
    try {
        const res = await fetch("http://localhost:4000/API/posts"); // เช็ค PORT ให้ตรงกับของ Railway
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const posts = await res.json();

        // Clear existing posts before loading
        const container = document.getElementById("cardContainer");
        container.innerHTML = "";

        // Render each post as a card
        posts.forEach((post) => {
            const card = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.description}</p>
                        <small class="text-muted">${post.date}</small>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (err) {
        console.error("Error loading posts:", err);
    }
}

// 2. Function to set active class in footer
function setActiveNavLink() {
    // Get the path of the current file (e.g., "home.html")
    const path = window.location.pathname.split("/").pop();

    // Remove active class from all icons
    document.querySelectorAll('.footer-icon').forEach(icon => {
        icon.classList.remove('active');
    });

    // Set active class based on the current path
    switch (path) {
        case 'home.html':
            document.getElementById('homeLink').classList.add('active');
            break;
        case 'search.html':
            document.getElementById('searchLink').classList.add('active');
            break;
        case 'add.html':
            document.getElementById('addLink').classList.add('active');
            break;
        case 'signup_login.html':
            document.getElementById('setLink').classList.add('active');
            break;
    }
}

// ==========================
// 3. Event Listeners
// ==========================
// Set active footer link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Load posts when opening the Home page
document.addEventListener('DOMContentLoaded', loadPosts);
