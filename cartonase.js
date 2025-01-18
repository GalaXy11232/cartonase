window.addEventListener("load", () => {
    for (data in JSON.parse(localStorage.getItem(localStorageEntry)).intrebari)
        creeazaCartonas(data);
})

function creeazaCartonas(cartonasIndex) {
    const dataObj = JSON.parse(localStorage.getItem(localStorageEntry))
    const question = dataObj.intrebari;
    const answers = dataObj.raspunsuri;

    let mainContainer = document.createElement("div");
    let intrebare = document.createElement("h3");
    let listaRaspunsuri = document.createElement("ol");

    mainContainer.className = "cartonas";
    intrebare.className = "titlu-cartonas";
    
    intrebare.textContent = question[cartonasIndex];
    for (ans in answers[cartonasIndex]) {
        let raspuns = document.createElement("li");
        raspuns.textContent = answers[cartonasIndex][ans];

        listaRaspunsuri.appendChild(raspuns);
    }

    mainContainer.appendChild(intrebare);
    mainContainer.appendChild(listaRaspunsuri);
    document.getElementById("container-cartonase").appendChild(mainContainer);
    
}