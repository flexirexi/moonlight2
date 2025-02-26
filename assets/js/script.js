document.addEventListener("DOMContentLoaded", () => {
    let currentLang = "en";

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
                if (texts[key]) el.textContent = texts[key];
            });
        } catch (error) {
            console.error("Fehler beim Laden oder Parsen der JSON:", error);
        }
    }

    document.getElementById("language-toggle").addEventListener("click", () => {
        currentLang = currentLang === "en" ? "de" : "en";
        document.getElementById("language-toggle").textContent = currentLang.toUpperCase();
        loadLanguage(currentLang);
    });

    loadLanguage(currentLang);
});