document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const langToggle = document.getElementById("language-toggle");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    function closeNavbar() {
        if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click(); // Simuliert den Klick zum Schließen der Navbar
        }
    }
    
    // Event-Listener für die Buttons, um die Navbar zu schließen
    themeToggle.addEventListener("click", closeNavbar);
    langToggle.addEventListener("click", closeNavbar);
});


