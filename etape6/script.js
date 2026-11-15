"use strict";

let lignes = 0;
let total_points = 0;

let persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

init();

function init() {
    for (let p of persons) {
        doInsert(p.nom, p.prenom, p.points);
    }
}

function doNewData() {
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    const nom = elt_nom.value;
    const prenom = elt_prenom.value;
    const points = parseInt(elt_points.value);

    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        alert("Formulaire incomplet !");
    } else {
        persons.push({ nom: nom, prenom: prenom, points: points });
        doInsert(nom, prenom, points);

        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

function doInsert(nom, prenom, points) {
    lignes++;
    total_points += points;
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary();
}

function update_summary() {
    document.getElementById("p1").innerText = lignes + " ligne(s)";
    document.getElementById("p3").innerText = "Total point(s)= " + total_points;
}

function doInsertRowTable(num, nom, prenom, points) {
    const table = document.querySelector("table");
    const row = document.createElement("tr");
    row.setAttribute("class", "row");

    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.appendChild(checkbox);

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);

    table.appendChild(row);
}

function consoleTableau() {
    console.log(persons);
}

function deleteRow() {
    if (lignes === 0) {
        alert("Le tableau est vide !");
        return;
    }

    const checkboxes = document.querySelectorAll(".col_chkbox input[type='checkbox']");
    let cochees = false;
    for (let cb of checkboxes) {
        if (cb.checked) {
            cochees = true;
            break;
        }
    }

    if (!cochees) {
        alert("Sélectionnez au moins une ligne !");
        return;
    }

    if (!confirm("Voulez-vous vraiment supprimer les lignes sélectionnées ?")) {
        return;
    }

    const rows = document.querySelectorAll("table tr");

    for (let i = rows.length - 1; i >= 1; i--) {
        const row = rows[i];
        const checkbox = row.querySelector(".col_chkbox input");

        if (checkbox && checkbox.checked) {
            const pointsCell = row.querySelectorAll("td")[3];
            const pts = parseInt(pointsCell.innerText);

            total_points -= pts;
            lignes--;

            persons.splice(i - 1, 1);
            row.remove();
        }
    }

    const remainingRows = document.querySelectorAll("table tr");
    for (let i = 1; i < remainingRows.length; i++) {
        remainingRows[i].querySelectorAll("td")[0].innerText = i;
    }

    update_summary();
}