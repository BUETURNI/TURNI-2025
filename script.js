document.addEventListener("DOMContentLoaded", function () {
    const turniContainer = document.getElementById("turni-container");
    const annullaButton = document.getElementById("annulla-btn");

    let turniPrecedenti = null;
    const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
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
        if (reparto.toLowerCase().includes("reception")) return "reception";
        if (reparto.toLowerCase().includes("cucina")) return "cucina";
        if (reparto.toLowerCase().includes("pulizie")) return "pulizie";
        if (reparto.toLowerCase().includes("bar attico")) return "bar-attico";
        if (reparto.toLowerCase().includes("bar strada")) return "bar-strada";
        if (reparto.toLowerCase().includes("liberi")) return "liberi";
        return "";
    }

    function renderTurni() {
        turniContainer.innerHTML = "";

        giorniSettimana.forEach(giorno => {
            const giornoSection = document.createElement("div");
            giornoSection.className = "giorno-section";
            giornoSection.innerHTML = `<h2 class="giorno-title">${giorno}</h2>`;

            let groupedTurni = {};
            if (!turniSettimanali[giorno]) turniSettimanali[giorno] = [];

            turniSettimanali[giorno].forEach(turno => {
                if (!groupedTurni[turno.reparto]) groupedTurni[turno.reparto] = [];
                groupedTurni[turno.reparto].push(turno);
            });

            repartiDisponibili.forEach(reparto => {
                if (!groupedTurni[reparto]) groupedTurni[reparto] = [];

                const card = document.createElement("div");
                card.className = `turno-card ${getRepartoClass(reparto)}`;
                card.setAttribute("data-giorno", giorno);
                card.setAttribute("data-reparto", reparto);
                card.innerHTML = `<h3>${reparto}</h3>`;
                card.addEventListener("dragover", allowDrop);
                card.addEventListener("drop", dropTurno);

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
                giornoSection.appendChild(card);
            });

            turniContainer.appendChild(giornoSection);
        });
    }

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.getAttribute("data-id"));
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function dropTurno(event) {
        event.preventDefault();
    }

    annullaButton.addEventListener("click", () => location.reload());

    renderTurni();
});
