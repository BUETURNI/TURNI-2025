document.addEventListener("DOMContentLoaded", function () {
    const turni = [
        { id: 1, nome: "Annalisa", ruolo: "Receptionist", orario: "07:30 - 15:30", reparto: "Reception" },
        { id: 2, nome: "Lucrezia", ruolo: "Receptionist", orario: "15:00 - 23:00", reparto: "Reception" },
        { id: 3, nome: "Gianfranco", ruolo: "Notturno", orario: "23:00 - 07:30", reparto: "Reception" },
        { id: 4, nome: "Sabrina", ruolo: "Responsabile Colazioni", orario: "06:00 - 14:00", reparto: "Cucina" },
        { id: 5, nome: "Grazia", ruolo: "Supporto Colazioni & Pulizie", orario: "07:00 - 15:00", reparto: "Cucina / Pulizie" },
        { id: 6, nome: "Bush", ruolo: "Chef Cucina", orario: "16:00 - 00:00", reparto: "Cucina" },
        { id: 7, nome: "Sara Floris", ruolo: "Addetta Pulizie", orario: "06:00 - 14:00", reparto: "Pulizie" },
        { id: 8, nome: "Vacante", ruolo: "Housekeeping Staff", orario: "06:00 - 14:00", reparto: "Pulizie" },
        { id: 9, nome: "Vacante", ruolo: "Barman Terrazza", orario: "07:30 - 15:30", reparto: "Bar" },
        { id: 10, nome: "Vacante", ruolo: "Barman Attico", orario: "16:00 - Chiusura", reparto: "Bar" }
    ];

    const tableBody = document.getElementById("turni-body");

    function renderTurni() {
        tableBody.innerHTML = ""; // Puliamo la tabella prima di aggiornare
        turni.forEach(turno => {
            const row = document.createElement("tr");
            row.setAttribute("draggable", true);
            row.setAttribute("data-id", turno.id);
            row.innerHTML = `
                <td>${turno.nome}</td>
                <td>${turno.ruolo}</td>
                <td>${turno.orario}</td>
                <td>${turno.reparto}</td>
            `;
            row.addEventListener("dragstart", dragStart);
            tableBody.appendChild(row);
        });
    }

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.getAttribute("data-id"));
    }

    tableBody.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    tableBody.addEventListener("drop", function (event) {
        event.preventDefault();
        const draggedId = event.dataTransfer.getData("text/plain");
        const draggedIndex = turni.findIndex(turno => turno.id == draggedId);
        
        if (draggedIndex !== -1) {
            const draggedTurno = turni.splice(draggedIndex, 1)[0];
            turni.push(draggedTurno); // Sposta il turno in fondo alla lista
            renderTurni();
        }
    });

    renderTurni(); // Carica la tabella inizialmente
});
