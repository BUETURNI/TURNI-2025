document.addEventListener("DOMContentLoaded", function () {
    const turniContainer = document.getElementById("turni-container");
    const giornoButtons = document.querySelectorAll(".giorno-btn");
    const annullaButton = document.getElementById("annulla-btn");

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
        if (reparto.toLowerCase().includes("reception")) return "reception";
        if (reparto.toLowerCase().includes("cucina")) return "cucina";
        if (reparto.toLowerCase().includes("pulizie")) return "pulizie";
        if (reparto.toLowerCase().includes("bar attico")) return "bar-attico";
        if (reparto.toLowerCase().includes("bar strada")) return "bar-strada";
        if (reparto.toLowerCase().includes("liberi")) return "liberi";
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

        repartiDisponibili.forEach(reparto => {
            if (!groupedTurni[reparto]) {
                groupedTurni[reparto] = [];
            }
        });

        Object.keys(groupedTurni).forEach(reparto => {
            const card = document.createElement("div");
            card.className = `turno-card ${getRepartoClass(reparto)}`;
            card.setAttribute("data-reparto", reparto);
            card.innerHTML = `<h2>${reparto}</h2>`;
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
            turniContainer.appendChild(card);
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
        const turnoId = event.dataTransfer.getData("text/plain");
        const newReparto = event.currentTarget.getAttribute("data-reparto");
        const giornoSelezionato = document.querySelector(".giorno-btn.active").dataset.giorno;

        let turnoIndex = turniSettimanali[giornoSelezionato].findIndex(t => t.id == turnoId);
        if (turnoIndex !== -1) {
            turniPrecedenti = JSON.parse(JSON.stringify(turniSettimanali)); // Salva lo stato precedente
            turniSettimanali[giornoSelezionato][turnoIndex].reparto = newReparto;
            saveTurni();
            renderTurni(giornoSelezionato);
        }
    }

    function saveTurni() {
        localStorage.setItem("turniSettimanali", JSON.stringify(turniSettimanali));
    }

    function annullaUltimaModifica() {
        if (turniPrecedenti) {
            turniSettimanali = JSON.parse(JSON.stringify(turniPrecedenti)); // Ripristina lo stato precedente
            saveTurni();
            const giornoSelezionato = document.querySelector(".giorno-btn.active").dataset.giorno;
            renderTurni(giornoSelezionato);
        }
    }

    annullaButton.addEventListener("click", annullaUltimaModifica);

    giornoButtons.forEach(button => {
        button.addEventListener("click", function () {
            giornoButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            renderTurni(button.dataset.giorno);
        });
    });

    document.querySelector(".giorno-btn[data-giorno='Lunedì']").click();
});
