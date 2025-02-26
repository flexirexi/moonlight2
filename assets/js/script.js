document.addEventListener("DOMContentLoaded", () => {
    let currentLang = "en";

    async function loadLanguage(lang) {
        document.documentElement.lang = lang;
        console.log("loadLanguage started: language; ", `locales/${lang}.json`);
        const response = await fetch(`locales/${lang}.json`);
        const texts = await response.json();

        document.querySelectorAll("[class]").forEach(el => {
            const key = el.classList[0]; // Nimmt die erste Klasse als Key
            if (texts[key]) el.textContent = texts[key];
        });
    }

    document.getElementById("language-toggle").addEventListener("click", () => {
        currentLang = currentLang === "en" ? "de" : "en";
        document.getElementById("language-toggle").textContent = currentLang.toUpperCase();
        loadLanguage(currentLang);
    });

    loadLanguage(currentLang);
});