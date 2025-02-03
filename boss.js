document.addEventListener("DOMContentLoaded", function () {
    const turniContainer = document.getElementById("turni-container");
    const giornoButtons = document.querySelectorAll(".giorno-btn");
    const annullaButton = document.getElementById("annulla-btn");
    const pubblicaButton = document.getElementById("pubblica-btn");

    let turniSettimanali = JSON.parse(localStorage.getItem("turniSettimanali")) || {
        "Lunedì": [],
        "Martedì": [],
        "Mercoledì": [],
        "Giovedì": [],
        "Venerdì": [],
        "Sabato": [],
        "Domenica": []
    };

    function renderTurni(giorno) {
        turniContainer.innerHTML = "";
        let turni = turniSettimanali[giorno] || [];

        turni.forEach(turno => {
            const turnoItem = document.createElement("div");
            turnoItem.innerHTML = `${turno.nome} - ${turno.ruolo} (${turno.orario})`;
            turniContainer.appendChild(turnoItem);
        });
    }

    pubblicaButton.addEventListener("click", () => {
        localStorage.setItem("turniPubblicati", JSON.stringify(turniSettimanali));
        alert("✅ Turni pubblicati con successo!");
    });

    giornoButtons.forEach(button => {
        button.addEventListener("click", function () {
            renderTurni(button.dataset.giorno);
        });
    });

    document.querySelector(".giorno-btn[data-giorno='Lunedì']").click();
});
