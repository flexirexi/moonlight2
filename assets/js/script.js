document.addEventListener("DOMContentLoaded", () => {
    let currentLang = "en";
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector("i");

    async function loadLanguage(lang) {
        document.documentElement.lang = lang;
        console.log(`Sprache wechseln zu: ${lang}`);
    
        try {
            // Fügt ein zufälliges Query-String-Element hinzu, um den Cache zu umgehen
            const response = await fetch(`locales/${lang}.json?nocache=${new Date().getTime()}`);
    
            if (!response.ok) {
                throw new Error(`Fehler beim Laden der Sprachdatei: ${lang}`);
            }
    
            const texts = await response.json();
    
            document.querySelectorAll("[class]").forEach(el => {
                const key = el.classList[0];
                if (texts[key]) el.innerHTML = texts[key];
            });
        } catch (error) {
            console.error("Fehler beim Laden oder Parsen der JSON:", error);
        }
    }

    document.getElementById("language-toggle").addEventListener("click", () => {
        let oldLang = currentLang;
        currentLang = currentLang === "en" ? "de" : "en";
        document.getElementById("language-toggle").textContent = oldLang.toUpperCase();
        loadLanguage(currentLang);
    });

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
    
    loadLanguage(currentLang);
});