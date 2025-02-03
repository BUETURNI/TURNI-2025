document.addEventListener("DOMContentLoaded", function () {
    const turniContainer = document.getElementById("turni-container");

    let turni = JSON.parse(localStorage.getItem("turni")) || [
        { id: 1, nome: "Annalisa", ruolo: "Receptionist", orario: "07:30 - 15:30", reparto: "Reception" },
        { id: 2, nome: "Lucrezia", ruolo: "Receptionist", orario: "15:00 - 23:00", reparto: "Reception" },
        { id: 3, nome: "Gianfranco", ruolo: "Notturno", orario: "23:00 - 07:30", reparto: "Reception" },
        { id: 4, nome: "Sabrina", ruolo: "Responsabile Colazioni", orario: "06:00 - 14:00", reparto: "Cucina" },
        { id: 5, nome: "Grazia", ruolo: "Supporto Colazioni & Pulizie", orario: "07:00 - 15:00", reparto: "Cucina" },
        { id: 6, nome: "Bush", ruolo: "Chef Cucina", orario: "16:00 - 00:00", reparto: "Cucina" },
        { id: 7, nome: "Sara Floris", ruolo: "Addetta Pulizie", orario: "06:00 - 14:00", reparto: "Pulizie" },
        { id: 8, nome: "Vacante", ruolo: "Housekeeping Staff", orario: "06:00 - 14:00", reparto: "Pulizie" },
        { id: 9, nome: "Vacante", ruolo: "Barman Terrazza", orario: "07:30 - 15:30", reparto: "Bar" },
        { id: 10, nome: "Vacante", ruolo: "Barman Attico", orario: "16:00 - Chiusura", reparto: "Bar" }
    ];

    function getRepartoClass(reparto) {
        if (reparto.toLowerCase().includes("reception")) return "reception";
        if (reparto.toLowerCase().includes("cucina")) return "cucina";
        if (reparto.toLowerCase().includes("pulizie")) return "pulizie";
        if (reparto.toLowerCase().includes("bar")) return "bar";
        return "";
    }

    function renderTurni() {
        turniContainer.innerHTML = "";
        turni.forEach(turno => {
            const card = document.createElement("div");
            card.className = `turno-card ${getRepartoClass(turno.reparto)}`;
            card.setAttribute("draggable", true);
            card.setAttribute("data-id", turno.id);
            card.innerHTML = `
                <h3>${turno.nome}</h3>
                <p><strong>${turno.ruolo}</strong></p>
                <p>${turno.orario}</p>
                <p>${turno.reparto}</p>
            `;
            card.addEventListener("dragstart", dragStart);
            turniContainer.appendChild(card);
        });
    }

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.getAttribute("data-id"));
    }

    turniContainer.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    turniContainer.addEventListener("drop", function (event) {
        event.preventDefault();
        const draggedId = event.dataTransfer.getData("text/plain");
        const draggedIndex = turni.findIndex(turno => turno.id == draggedId);

        if (draggedIndex !== -1) {
            const draggedTurno = turni.splice(draggedIndex, 1)[0];
            turni.push(draggedTurno);
            localStorage.setItem("turni", JSON.stringify(turni));
            renderTurni();
        }
    });

    renderTurni();
});
