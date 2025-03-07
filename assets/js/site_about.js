document.addEventListener("DOMContentLoaded", function () {
    const timelineCards = document.querySelectorAll(".timeline-card");

    function checkScroll() {
        timelineCards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.60) {
                card.classList.add("appear");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();
});
