// Set footer year automatically
document.getElementById("year").textContent = new Date().getFullYear();

// Highlight the current page in the nav menu
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  const itemPage = item.getAttribute("href");
  if (itemPage === currentPage) {
    item.classList.add("active");
  }
});