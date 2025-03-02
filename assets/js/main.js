document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const langToggle = document.getElementById("language-toggle");
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector("i");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    // Prüfen, ob ein gespeichertes Theme existiert
    const savedTheme = localStorage.getItem("theme") || "dark";
    html.setAttribute("theme", savedTheme);
    themeIcon.classList.add(savedTheme === "light" ? "fa-moon" : "fa-sun");

    // Event-Listener für den Theme-Switch
    themeToggle.addEventListener("click", () => {
        const newTheme = html.getAttribute("theme") === "dark" ? "light" : "dark";
        html.setAttribute("theme", newTheme);
        localStorage.setItem("theme", newTheme);

        // Icon wechseln
        themeIcon.classList.remove("fa-moon", "fa-sun");
        themeIcon.classList.add(newTheme === "dark" ? "fa-sun": "fa-moon");
    });

    function closeNavbar() {
        if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click(); // Simuliert den Klick zum Schließen der Navbar
        }
    }

    
    // Event-Listener für die Buttons, um die Navbar zu schließen
    themeToggle.addEventListener("click", closeNavbar);
    langToggle.addEventListener("click", closeNavbar);
});


