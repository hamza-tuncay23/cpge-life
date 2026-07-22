// ============================================
// FICHIER : /js/countdown.js
// DESCRIPTION : Compte à rebours des événements
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const evenements = SITE_DATA.evenements;
    const container = document.getElementById('countdownContainer');

    if (!container) return;

    // Créer les cercles
    evenements.forEach(function(event) {
        const circle = document.createElement('div');
        circle.className = 'countdown-circle';
        circle.dataset.eventId = event.id;
        circle.dataset.date = event.date;

        circle.innerHTML = `
            <div class="circle-icon">${event.icone}</div>
            <div class="circle-time" id="time-${event.id}">
                <span class="circle-days">--</span>j <span id="hours-${event.id}">--</span>h
            </div>
            <div class="circle-name">${event.nom}</div>
        `;

        container.appendChild(circle);
    });

    // Fonction de mise à jour
    function updateCountdowns() {
        const now = new Date();

        evenements.forEach(function(event) {
            const targetDate = new Date(event.date);
            const diff = targetDate - now;

            if (diff > 0) {
                const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
                const heures = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                const timeElement = document.getElementById(`time-${event.id}`);
                const hoursElement = document.getElementById(`hours-${event.id}`);

                if (timeElement) {
                    const daysSpan = timeElement.querySelector('.circle-days');
                    if (daysSpan) daysSpan.textContent = String(jours).padStart(2, '0');
                }
                if (hoursElement) {
                    hoursElement.textContent = String(heures).padStart(2, '0');
                }
            } else {
                const timeElement = document.getElementById(`time-${event.id}`);
                const hoursElement = document.getElementById(`hours-${event.id}`);

                if (timeElement) {
                    const daysSpan = timeElement.querySelector('.circle-days');
                    if (daysSpan) daysSpan.textContent = '00';
                }
                if (hoursElement) {
                    hoursElement.textContent = '00';
                }
            }
        });
    }

    // Mettre à jour toutes les secondes
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
});