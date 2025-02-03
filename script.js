document.addEventListener("DOMContentLoaded", function () {
    const turniContainer = document.getElementById("turni-container");
    const giornoButtons = document.querySelectorAll(".giorno-btn");

    // Tutti i reparti da visualizzare sempre
    const repartiDisponibili = ["Reception", "Cucina", "Pulizie", "Bar Strada", "Bar Attico"];

    // Dati settimanali (caricati da LocalStorage o predefiniti)
    let turniSettimanali = JSON.parse(localStorage.getItem("turniSettimanali")) || {
        "Lunedì": [],
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

        // Assicuriamoci che il giorno abbia un array valido
        if (!turniSettimanali[giorno]) {
            turniSettimanali[giorno] = [];
        }

        // Raggruppiamo i turni per reparto
        turniSettimanali[giorno].forEach(turno => {
            if (!groupedTurni[turno.reparto]) {
                groupedTurni[turno.reparto] = [];
            }
            groupedTurni[turno.reparto].push(turno);
        });

        // Assicuriamoci che tutti i reparti siano sempre visibili
        repartiDisponibili.forEach(reparto => {
            if (!groupedTurni[reparto]) {
                groupedTurni[reparto] = []; // Inizializza un array vuoto per il reparto
            }
        });

        // Creazione delle schede dei reparti
        Object.keys(groupedTurni).forEach(reparto => {
            const card = document.createElement("div");
            card.className = `turno-card ${getRepartoClass(reparto)}`;
            card.innerHTML = `<h2>${reparto}</h2>`;

            const turniList = document.createElement("ul");

            if (groupedTurni[reparto].length > 0) {
                groupedTurni[reparto].forEach(turno => {
                    const turnoItem = document.createElement("li");
                    turnoItem.setAttribute("contenteditable", "true");
                    turnoItem.innerHTML = `${turno.nome} - ${turno.ruolo} (${turno.orario})`;
                    turniList.appendChild(turnoItem);
                });
            } else {
                // Se il reparto non ha turni, mostra un messaggio
                const emptyMessage = document.createElement("p");
                emptyMessage.innerText = "Nessun turno assegnato";
                emptyMessage.style.fontStyle = "italic";
                emptyMessage.style.color = "#ccc";
                turniList.appendChild(emptyMessage);
            }

            card.appendChild(turniList);

            // Pulsante per aggiungere nuovi turni
            const addButton = document.createElement("button");
            addButton.innerText = "➕ Aggiungi Turno";
            addButton.onclick = () => {
                const nuovoTurno = {
                    id: Date.now(),
                    nome: "Nuovo",
                    ruolo: "Ruolo",
                    orario: "00:00 - 00:00",
                    reparto: reparto
                };
                turniSettimanali[giorno].push(nuovoTurno);
                saveTurni();
                renderTurni(giorno);
            };

            // Pulsante per salvare modifiche
            const saveButton = document.createElement("button");
            saveButton.innerText = "💾 Salva Modifiche";
            saveButton.onclick = saveTurni;

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
