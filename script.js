document.addEventListener("DOMContentLoaded", function () {
    const turniContainer = document.getElementById("turni-container");
    const giornoButtons = document.querySelectorAll(".giorno-btn");
    const annullaButton = document.getElementById("annulla-btn");
    const ruoloSelect = document.getElementById("ruolo");

    let ruoloCorrente = localStorage.getItem("ruolo") || "visualizzazione";
    ruoloSelect.value = ruoloCorrente;

    let turniSettimanali = JSON.parse(localStorage.getItem("turniSettimanali")) || {
        "Lunedì": [],
        "Martedì": [],
        "Mercoledì": [],
        "Giovedì": [],
        "Venerdì": [],
        "Sabato": [],
        "Domenica": []
    };

    function cambiaRuolo() {
        ruoloCorrente = ruoloSelect.value;
        localStorage.setItem("ruolo", ruoloCorrente);
        renderTurni(document.querySelector(".giorno-btn.active").dataset.giorno);
    }

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
                turnoItem.innerHTML = `${turno.nome} - ${turno.ruolo} (${turno.orario})`;

                if (ruoloCorrente !== "visualizzazione") {
                   
