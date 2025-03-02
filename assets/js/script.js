document.addEventListener("DOMContentLoaded", () => {
    let currentLang = "en";
    const themeToggle = document.getElementById("theme-toggle");
    const langToggle = document.getElementById("language-toggle");
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector("i");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");


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

    langToggle.addEventListener("click", () => {
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

    function closeNavbar() {
        if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click(); // Simuliert den Klick zum Schließen der Navbar
        }
    }

    loadLanguage("en");
    loadAudioList();
    // Event-Listener für die Buttons, um die Navbar zu schließen
    themeToggle.addEventListener("click", closeNavbar);
    langToggle.addEventListener("click", closeNavbar);
});


async function loadAudioList() {
    const audioContainer = document.getElementById("audio-list"); 
    const audioPath = "assets/audio/landing_page/"; 
    try {
        // Lade die Datei-Liste (serverseitig bereitstellen oder manuell anlegen)
        const response = await fetch(`${audioPath}file-list.json`);
        const fileList = await response.json(); // Erwartet ein Array mit Dateinamen (ohne Endung)

        for (const file of fileList) {
            const txtFile = `${audioPath}${file}.txt`;
            const audioFile = `${audioPath}${file}.mp3`;

            // Prüfe, ob die TXT-Datei existiert
            const txtResponse = await fetch(txtFile);
            if (!txtResponse.ok) continue; // Falls TXT fehlt, überspringen

            const txtContent = await txtResponse.text(); // Inhalt der TXT-Datei lesen
            const [title, ...detailsArray] = txtContent.split("\n"); // Erste Zeile = Titel, Rest = Details
            const detailsText = detailsArray.join(" ").trim() || "Keine Beschreibung verfügbar.";

            // Prüfe, ob das Audiofile existiert
            const audioResponse = await fetch(audioFile, { method: "HEAD" });
            if (!audioResponse.ok) continue; // Falls MP3 fehlt, überspringen

            // Erstelle das HTML für das Audio-Element
            const audioElement = document.createElement("article");
            audioElement.classList.add("audio-item");
            audioElement.innerHTML = `
                <h6 style="margin-top: 35px; margin-bottom: 12px;">${title.trim()}</h6>
                <audio controls style="width: 90%; max-width: 900px; margin-bottom: 0;">
                    <source src="${audioFile}" type="audio/mpeg">
                    Dein Browser unterstützt das Audio-Element nicht.
                </audio>
                <details style="margin-bottom: 45px;">
                <summary style="margin-bottom: 0;">Details</summary>
                    <p style="font-size: 0.9rem;"> ${detailsText}</p>
                </details>
            `;
            audioContainer.appendChild(audioElement);
        }
    } catch (error) {
        console.error("Fehler beim Laden der Audio-Dateien:", error);
    }
}