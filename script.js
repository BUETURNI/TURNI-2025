document.addEventListener("DOMContentLoaded", function () {
    const turniContainer = document.getElementById("turni-container");
    const giornoButtons = document.querySelectorAll(".giorno-btn");

    let turniSettimanali = JSON.parse(localStorage.getItem("turniSettimanali")) || {
        "Lunedì": [
            { id: 1, nome: "Annalisa", ruolo: "Receptionist", orario: "07:30 - 15:30", reparto: "Reception" },
            { id: 4, nome: "Sabrina", ruolo: "Responsabile Colazioni", orario: "06:00 - 14:00", reparto: "Cucina" }
        ],
        "Martedì": [],
        "Mercoledì": [],
        "Giovedì": [],
        "Venerdì": [],
        "Sabato": [],
        "Domenica": []
    };

    function getRepartoClass(reparto) {
        if (reparto.toLowerCase().includes("reception")) return "reception";
        if (reparto.toLowerCase().includes("cucina")) return "cucina";
        if (reparto.toLowerCase().includes("pulizie")) return "pulizie";
        if (reparto.toLowerCase().includes("bar attico")) return "bar-attico";
        if (reparto.toLowerCase().includes("bar strada")) return "bar-strada";
        return "";
    }

    function renderTurni(giorno) {
        turniContainer.innerHTML = "";
        let groupedTurni = {};

        if (!turniSettimanali[giorno]) {
            turniSettimanali[giorno] = [];
        }

        turniSettimanali[giorno].forEach(turno => {
            if (!groupedTurni[turno.reparto]) {
                groupedTurni[turno.reparto] = [];
            }
            groupedTurni[turno.reparto].push(turno);
        });

        Object.keys(groupedTurni).forEach(reparto => {
            const card = document.createElement("div");
            card.className = `turno-card ${getRepartoClass(reparto)}`;
            card.innerHTML = `<h2>${reparto}</h2><ul>${groupedTurni[reparto].map(turno => `
                <li contenteditable="true">${turno.nome} - ${turno.ruolo} (${turno.orario})</li>`).join("")}</ul>`;

            // Pulsante per aggiungere nuovi turni
            const addButton = document.createElement("button");
            addButton.innerText = "➕ Aggiungi Turno";
            addButton.onclick = () => {
                const nuovoTurno = { id: Date.now(), nome: "Nuovo", ruolo: "Ruolo", orario: "00:00 - 00:00", reparto: reparto };
                turniSettimanali[giorno].push(nuovoTurno);
                saveTurni();
                renderTurni(giorno);
            };

            // Pulsante per salvare modifiche
            const saveButton = document.createElement("button");
            saveButton.innerText = "💾 Salva Modifiche";
            saveButton.onclick = () => saveTurni();

            card.appendChild(addButton);
            card.appendChild(saveButton);
            turniContainer.appendChild(card);
        });
    }

    function saveTurni() {
        localStorage.setItem("turniSettimanali", JSON.stringify(turniSettimanali));
    }

    // Selezione giorno e aggiornamento dei turni
    giornoButtons.forEach(button => {
        button.addEventListener("click", function () {
            giornoButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            renderTurni(button.dataset.giorno);
        });
    });

    // Seleziona automaticamente il Lunedì all'avvio e mostra i turni
    document.querySelector(".giorno-btn[data-giorno='Lunedì']").click();
});
