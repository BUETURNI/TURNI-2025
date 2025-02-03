document.addEventListener("DOMContentLoaded", function () {
    const turni = [
        { nome: "Annalisa", ruolo: "Receptionist", orario: "07:30 - 15:30", reparto: "Reception" },
        { nome: "Lucrezia", ruolo: "Receptionist", orario: "15:00 - 23:00", reparto: "Reception" },
        { nome: "Gianfranco", ruolo: "Notturno", orario: "23:00 - 07:30", reparto: "Reception" },
        { nome: "Sabrina", ruolo: "Responsabile Colazioni", orario: "06:00 - 14:00", reparto: "Cucina" },
        { nome: "Grazia", ruolo: "Supporto Colazioni & Pulizie", orario: "07:00 - 15:00", reparto: "Cucina / Pulizie" },
        { nome: "Bush", ruolo: "Chef Cucina", orario: "16:00 - 00:00", reparto: "Cucina" },
        { nome: "Sara Floris", ruolo: "Addetta Pulizie", orario: "06:00 - 14:00", reparto: "Pulizie" },
        { nome: "Vacante", ruolo: "Housekeeping Staff", orario: "06:00 - 14:00", reparto: "Pulizie" },
        { nome: "Vacante", ruolo: "Barman Terrazza", orario: "07:30 - 15:30", reparto: "Bar" },
        { nome: "Vacante", ruolo: "Barman Attico", orario: "16:00 - Chiusura", reparto: "Bar" }
    ];

    const tableBody = document.getElementById("turni-body");

    turni.forEach(turno => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${turno.nome}</td>
            <td>${turno.ruolo}</td>
            <td>${turno.orario}</td>
            <td>${turno.reparto}</td>
        `;
        tableBody.appendChild(row);
    });
});
