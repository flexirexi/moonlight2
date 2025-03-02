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
    
    
    loadLanguage("en");
    loadAudioList();
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
                <h6 style="margin-top: 25px;">${title.trim()}</h6>
                <details>
                    <summary style="margin-bottom: 5px;">Details</summary>
                    <p style="color: #b1b1b1; font-size: 0.9rem;"> ${detailsText}</p>
                </details>
                <audio controls style="width: 90%; max-width: 900px;">
                    <source src="${audioFile}" type="audio/mpeg">
                    Dein Browser unterstützt das Audio-Element nicht.
                </audio>
            `;
            audioContainer.appendChild(audioElement);
        }
    } catch (error) {
        console.error("Fehler beim Laden der Audio-Dateien:", error);
    }
}