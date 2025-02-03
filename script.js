document.addEventListener("DOMContentLoaded", function () {
    const turniContainer = document.getElementById("turni-container");

    let turni = JSON.parse(localStorage.getItem("turni")) || [
        { id: 1, nome: "Annalisa", ruolo: "Receptionist", orario: "07:30 - 15:30", reparto: "Reception" },
        { id: 2, nome: "Lucrezia", ruolo: "Receptionist", orario: "15:00 - 23:00", reparto: "Reception" },
        { id: 3, nome: "Gianfranco", ruolo: "Notturno", orario: "23:00 - 07:30", reparto: "Reception" },
        { id: 4, nome: "Sabrina", ruolo: "Responsabile Colazioni", orario: "06:00 - 14:00", reparto: "Cucina" },
        { id: 5, nome: "Grazia", ruolo: "Supporto Colazioni & Pulizie", orario: "07:00 - 15:00", reparto: "Cucina" }, // Può essere spostata tra Cucina e Pulizie
        { id: 6, nome: "Bush", ruolo: "Chef Cucina", orario: "16:00 - 00:00", reparto: "Cucina" },
        { id: 7, nome: "Sara Floris", ruolo: "Addetta Pulizie", orario: "06:00 - 14:00", reparto: "Pulizie" },
        { id: 8, nome: "Vacante", ruolo: "Housekeeping Staff", orario: "06:00 - 14:00", reparto: "Pulizie" },
        { id: 9, nome: "Vacante", ruolo: "Barman Strada", orario: "07:30 - 15:30", reparto: "Bar Strada" },
        { id: 10, nome: "Vacante", ruolo: "Barman Attico", orario: "16:00 - Chiusura", reparto: "Bar Attico" }
    ];

    function getRepartoClass(reparto) {
        if (reparto.toLowerCase().includes("reception")) return "reception";
        if (reparto.toLowerCase().includes("cucina")) return "cucina";
        if (reparto.toLowerCase().includes("pulizie")) return "pulizie";
        if (reparto.toLowerCase().includes("bar attico")) return "bar-attico";
        if (reparto.toLowerCase().includes("bar strada")) return "bar-strada";
        return "";
    }

    function renderTurni() {
        turniContainer.innerHTML = "";
        let groupedTurni = {};

        turni.forEach(turno => {
            if (!groupedTurni[turno.reparto]) {
                groupedTurni[turno.reparto] = [];
            }
            groupedTurni[turno.reparto].push(turno);
        });

        Object.keys(groupedTurni).forEach(reparto => {
            const card = document.createElement("div");
            card.className = `turno-card ${getRepartoClass(reparto)}`;
            card.innerHTML = `<h2>${reparto}</h2><ul>${groupedTurni[reparto].map(turno => `
                <li contenteditable="true" draggable="true" data-id="${turno.id}">${turno.nome} - ${turno.ruolo} (${turno.orario})</li>`).join("")}</ul>`;

            const addButton = document.createElement("button");
            addButton.innerText = "➕ Aggiungi Turno";
            addButton.onclick = () => {
                const nuovoTurno = { id: Date.now(), nome: "Nuovo", ruolo: "Ruolo", orario: "00:00 - 00:00", reparto: reparto };
                turni.push(nuovoTurno);
                saveTurni();
                renderTurni();
            };

            const saveButton = document.createElement("button");
            saveButton.innerText = "💾 Salva Modifiche";
            saveButton.onclick = saveTurni;

            card.appendChild(addButton);
            card.appendChild(saveButton);
            turniContainer.appendChild(card);
        });
    }

    function saveTurni() {
        localStorage.setItem("turni", JSON.stringify(turni));
        renderTurni();
    }

    renderTurni();
});
