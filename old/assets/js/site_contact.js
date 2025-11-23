document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.init("td8yqeDgGLiud1lKu"); // kein secret key, nur public

    const form = this;
    if (document.documentElement.lang == "de") {
        emailjs.sendForm("service_5x00awe", "template_am9lqdr", form)
            .then(function () {
                alert("Nachricht erfolgreich gesendet! Wir melden uns bald.");
                form.reset();
            }, function (error) {
                console.error("Email konnte nicht gesendet werden:", error);
                alert("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
            });
    } else {
        emailjs.sendForm("service_5x00awe", "template_mb339u7", form)
            .then(function () {
                alert("Message sent! We'll come back to you soon.");
                form.reset();
            }, function (error) {
                console.error("Email konnte nicht gesendet werden:", error);
                alert("An error occured. Please try it again.");
            });
    }
});
