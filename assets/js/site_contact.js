document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const message = `
        Name: ${data.name}
        Künstlername/Band: ${data.artist || "Nicht angegeben"}
        Telefon: ${data.phone}
        E-Mail: ${data.email}

        Recording: ${data.recording}
        Production: ${data.production}
        Komposition: ${data.composition}
        Anderes: ${data.other}

        Beschreibung: ${data.description}
    `;

    const mailTo = "requests@moonlightstudiosffm.com";
    const subject = "Neue Anfrage über das Kontaktformular";
    const body = encodeURIComponent(message);

    window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`;
    console.log(body);
});
