document.addEventListener("DOMContentLoaded", () => {
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
                <h6 style="margin-top: 35px; margin-bottom: 12px;">${title.trim()}</h6>
                <audio controls style="width: 90%; max-width: 900px; margin-bottom: 0;" preload="none">
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