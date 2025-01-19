var modal = document.getElementById("cartonasModal");
var span = document.getElementsByClassName("close")[0];

window.onclick = function(event) {
    if (event.target == modal) { closeModal(); }
}

function openModal(fromWhichIndex) { 
    const dataObj = JSON.parse(localStorage.getItem(localStorageEntry));
    const dataIntrebari = dataObj.intrebari;
    const dataRaspunsuri = dataObj.raspunsuri;

    let titlu = document.getElementById("titluModal");
    titlu.textContent = "Editare cartonas " + (fromWhichIndex + 1);

    let intrebareaNode = document.getElementById("modal-intrebarea");
    let raspunsuriNodes = [
        document.getElementById("modal-raspunsul1"),
        document.getElementById("modal-raspunsul2"),
        document.getElementById("modal-raspunsul3"),
        document.getElementById("modal-raspunsul4")
    ]
    
    let radioNodes = [
        document.getElementById("modalCheckbox1"),
        document.getElementById("modalCheckbox2"),
        document.getElementById("modalCheckbox3"),
        document.getElementById("modalCheckbox4")
    ]

    intrebareaNode.value = dataIntrebari[fromWhichIndex];
    for (let i in raspunsuriNodes) 
        raspunsuriNodes[i].value = dataRaspunsuri[fromWhichIndex][i];

    for (let i in radioNodes) {
        if (Number(i) + 1 == Number(dataRaspunsuri[fromWhichIndex][4])) radioNodes[i].checked = true;
        else radioNodes[i].checked = false;
    }

    document.getElementById("salveazaModal").style.visibility = "visible";
    document.getElementById("creeazaModal").style.visibility = "collapse";

    // arata-l la final
    modal.style.display = "block";
}

function closeModal() { modal.style.display = "none"; }


function saveModal() {
    const dataObj = JSON.parse(localStorage.getItem(localStorageEntry));
    const dataIntrebari = dataObj.intrebari;
    const dataRaspunsuri = dataObj.raspunsuri;

    let titlu = document.getElementById("titluModal");
    let titluWords = titlu.textContent.split(" ");

    let index = Number(titluWords[titluWords.length - 1]) - 1;

    let intrebareaNode = document.getElementById("modal-intrebarea");
    let raspunsuriNodes = [
        document.getElementById("modal-raspunsul1"),
        document.getElementById("modal-raspunsul2"),
        document.getElementById("modal-raspunsul3"),
        document.getElementById("modal-raspunsul4")
    ]
    
    let radioNodes = [
        document.getElementById("modalCheckbox1"),
        document.getElementById("modalCheckbox2"),
        document.getElementById("modalCheckbox3"),
        document.getElementById("modalCheckbox4")
    ]

    dataIntrebari[index] = intrebareaNode.value;
    for (let i in raspunsuriNodes) 
        dataRaspunsuri[index][i] = raspunsuriNodes[i].value;
    
    let correctIndex = 0;
    for (let i in radioNodes)
        if (radioNodes[i].checked) { correctIndex = i; break; }
    dataRaspunsuri[index][4] = Number(correctIndex) + 1;


    clearStorage();
    localStorage.setItem(localStorageEntry, JSON.stringify(dataObj));
    checkCartonase();

    modal.style.display = "none";
}


function buildCartonas() {
    let titlu = document.getElementById("titluModal");
    titlu.textContent = "Creare cartonas";

    let intrebareaNode = document.getElementById("modal-intrebarea");
    let raspunsuriNodes = [
        document.getElementById("modal-raspunsul1"),
        document.getElementById("modal-raspunsul2"),
        document.getElementById("modal-raspunsul3"),
        document.getElementById("modal-raspunsul4")
    ]
    
    let radioNodes = [
        document.getElementById("modalCheckbox1"),
        document.getElementById("modalCheckbox2"),
        document.getElementById("modalCheckbox3"),
        document.getElementById("modalCheckbox4")
    ]

    document.getElementById("salveazaModal").style.visibility = "collapse";
    document.getElementById("creeazaModal").style.visibility = "visible";

    intrebareaNode.value = "";
    intrebareaNode.placeholder = "Introdu intrebarea dorita";

    for (let rasp of raspunsuriNodes) {
        rasp.value = "";
        rasp.placeholder = "Introdu raspunsul " + (Number(raspunsuriNodes.indexOf(rasp)) + 1);
    }

    for (let radio of radioNodes)
        radio.checked = false;

    modal.style.display = "block";
}


function saveCartonas() {
    // const dataObj = JSON.parse(localStorage.getItem(localStorageEntry));
    // const dataIntrebari = dataObj.intrebari;
    // const dataRaspunsuri = dataObj.raspunsuri;

    let intrebareaNode = document.getElementById("modal-intrebarea");
    let raspunsuriNodes = [
        document.getElementById("modal-raspunsul1"),
        document.getElementById("modal-raspunsul2"),
        document.getElementById("modal-raspunsul3"),
        document.getElementById("modal-raspunsul4")
    ]
    
    let radioNodes = [
        document.getElementById("modalCheckbox1"),
        document.getElementById("modalCheckbox2"),
        document.getElementById("modalCheckbox3"),
        document.getElementById("modalCheckbox4")
    ]


    // Check for invalid prompts
    if (intrebareaNode.value.length == 0 || checkEmpty(intrebareaNode.value)) { alertWrong(); return; }
    for (let i of raspunsuriNodes) 
        if (i.value.length == 0 || checkEmpty(i.value)) { alertWrong(); return; }
    
    let allUnchecked = 1, corrIndex;
    for (let i of radioNodes)
        if (i.checked) { corrIndex = Number(radioNodes.indexOf(i)) + 1; allUnchecked = 0; break; }
    
    if (allUnchecked) { alertWrong(); return; }


    let raspunsuri = [];
    for (let i of raspunsuriNodes) raspunsuri.push(i.value);
    raspunsuri.push(String(corrIndex));

    updateData(intrebareaNode.value, raspunsuri);
    closeModal();
}

function alertWrong() {
    alert("Te rog introdu o intrebare valida.");
    return;
}
