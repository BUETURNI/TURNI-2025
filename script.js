document.addEventListener("DOMContentLoaded", function () {
    const turniContainer = document.getElementById("turni-container");
    const giornoButtons = document.querySelectorAll(".giorno-btn");

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

            turniContainer.appendChild(card);
        });
    }

    // Selezione giorno e aggiornamento dei turni
    giornoButtons.forEach(button => {
        button.addEventListener("click", function () {
            giornoButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            renderTurni(button.dataset.giorno);
        });
    });

    // Seleziona automaticamente il Lunedì all'avvio
    document.querySelector(".giorno-btn[data-giorno='Lunedì']").click();
});
