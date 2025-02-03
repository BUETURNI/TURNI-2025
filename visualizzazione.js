document.addEventListener("DOMContentLoaded", function () {
    const turniContainer = document.getElementById("turni-container");
    const giornoButtons = document.querySelectorAll(".giorno-btn");

    let turniPubblicati = JSON.parse(localStorage.getItem("turniPubblicati")) || {};

    function renderTurni(giorno) {
        turniContainer.innerHTML = "";
        let turni = turniPubblicati[giorno] || [];

        turni.forEach(turno => {
            const turnoItem = document.createElement("div");
            turnoItem.innerHTML = `${turno.nome} - ${turno.ruolo} (${turno.orario})`;
            turniContainer.appendChild(turnoItem);
        });
    }

    giornoButtons.forEach(button => {
        button.addEventListener("click", function () {
            renderTurni(button.dataset.giorno);
        });
    });

    document.querySelector(".giorno-btn[data-giorno='Lunedì']").click();
});
