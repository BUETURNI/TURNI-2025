document.addEventListener("DOMContentLoaded", function () {
    const turniContainer = document.getElementById("turni-container");
    const giornoButtons = document.querySelectorAll(".giorno-btn");
    const annullaButton = document.getElementById("annulla-btn");
    const pubblicaButton = document.getElementById("pubblica-btn");

    let turniPrecedenti = null;
    const repartiDisponibili = ["Reception", "Cucina", "Pulizie", "Bar Strada", "Bar Attico", "LIBERI"];

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
        const classi = {
            "Reception": "reception",
            "Cucina": "cucina",
            "Pulizie": "pulizie",
            "Bar Attico": "bar-attico",
            "Bar Strada": "bar-strada",
            "LIBERI": "liberi"
        };
        return classi[reparto] || "";
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
            card.innerHTML = `<h2>${reparto}</h2>`;
            
            const turniList = document.createElement("ul");

            groupedTurni[reparto].forEach(turno => {
                const turnoItem = document.createElement("li");
                turnoItem.setAttribute("draggable", "true");
                turnoItem.setAttribute("data-id", turno.id);
                turnoItem.innerHTML = `${turno.nome} - ${turno.ruolo} (${turno.orario})`;
                turnoItem.addEventListener("dragstart", dragStart);
                turniList.appendChild(turnoItem);
            });

            card.appendChild(turniList);

            const addButton = document.createElement("button");
            addButton.innerText = "➕ Aggiungi Turno";
            addButton.onclick = () => {
                const nuovoTurno = { id: Date.now(), nome: "Nuovo", ruolo: "Ruolo", orario: "00:00 - 00:00", reparto: reparto };
                turniSettimanali[giorno].push(nuovoTurno);
                saveTurni();
                renderTurni(giorno);
            };
            card.appendChild(addButton);

            turniContainer.appendChild(card);
        });
    }

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.getAttribute("data-id"));
    }

    function saveTurni() {
        localStorage.setItem("turniSettimanali", JSON.stringify(turniSettimanali));
    }

    function pubblicaTurni() {
        localStorage.setItem("turniPubblicati", JSON.stringify(turniSettimanali));
        alert("✅ Turni pubblicati con successo!");
    }

    pubblicaButton.addEventListener("click", pubblicaTurni);

    giornoButtons.forEach(button => {
        button.addEventListener("click", function () {
            giornoButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            renderTurni(button.dataset.giorno);
        });
    });

    document.querySelector(".giorno-btn[data-giorno='Lunedì']").click();
});
