document.addEventListener("DOMContentLoaded", () => {
    const langToggle = document.getElementById("language-toggle");

    // Gespeicherte Sprache aus localStorage laden oder Standard setzen
    let currentLang = localStorage.getItem("lang") || document.documentElement.lang || "de";
    document.documentElement.lang = currentLang;
    langToggle.textContent = currentLang === "en" ? "DE" : "EN";

    async function loadLanguage(lang) {
        document.documentElement.lang = lang;
        console.log(`Sprache wechseln zu: ${lang}`);

        try {
            const response = await fetch(`locales/${lang}.json?nocache=${new Date().getTime()}`);
            if (!response.ok) throw new Error(`Fehler beim Laden der Sprachdatei: ${lang}`);

            const texts = await response.json();
            
            // Nur Elemente mit `data-lang` aktualisieren (verhindert ungewollte Änderungen)
            document.querySelectorAll("[data-lang]").forEach(el => {
                const key = el.dataset.lang; // Holt den Key aus data-lang
                if (texts[key]) el.innerHTML = texts[key];
            });

            // Sprache in localStorage speichern, damit sie beim Neuladen erhalten bleibt
            localStorage.setItem("lang", lang);
        } catch (error) {
            console.error("Fehler beim Laden oder Parsen der JSON:", error);
        }
    }

    langToggle.addEventListener("click", () => {
        //INFO: click event is also triggered in script.js to close navbar, this is a different context
        currentLang = currentLang === "en" ? "de" : "en";
        langToggle.textContent = currentLang === "en" ? "DE" : "EN";
        loadLanguage(currentLang);
    });

    loadLanguage(currentLang);
});
