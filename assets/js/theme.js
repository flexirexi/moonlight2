document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const html = document.documentElement;

    // Prüfen, ob ein gespeichertes Theme existiert
    const savedTheme = localStorage.getItem("data-theme") || "dark";
    html.setAttribute("data-theme", savedTheme);
    themeIcon.classList.add(savedTheme === "light" ? "fa-moon" : "fa-sun");

    // Event-Listener für den Theme-Switch
    themeToggle.addEventListener("click", () => {
        const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("data-theme", newTheme);

        // Icon wechseln
        themeIcon.classList.remove("fa-moon", "fa-sun");
        themeIcon.classList.add(newTheme === "dark" ? "fa-sun": "fa-moon");
    });
});