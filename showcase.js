const animationTime = 0.35;
var animationRunning = false;

window.addEventListener("load", () => {
    document.getElementById("counterCartonase").textContent = "1 / " + JSON.parse(localStorage.getItem(localStorageEntry)).intrebari.length;

    if (JSON.parse(localStorage.getItem(localStorageEntry)).intrebari.length > 0) {
        document.getElementById("container-showcase").style.visibility = "visible";
        document.getElementById("noCartonasShowcase").style.visibility = "hidden";
        document.getElementById("counterCartonase").style.visibility = "visible";
        setupCartonas(0);
    }

    else {
        document.getElementById("noCartonasShowcase").style.visibility = "visible";
        document.getElementById("counterCartonase").style.visibility = "hidden";
    }
})

function setupCartonas(INDEXCARTON) {
    const dataObj = JSON.parse(localStorage.getItem(localStorageEntry));
    const dataIntrebari = dataObj.intrebari;
    const dataRaspunsuri = dataObj.raspunsuri;

    let intrebare = document.getElementById("intrebare-cartonas");
    let raspunsuri = [
        document.getElementById("raspuns1"),
        document.getElementById("raspuns2"),
        document.getElementById("raspuns3"),
        document.getElementById("raspuns4")
    ]

    let butonstanga = document.getElementById("butonStanga");
    let butondreapta = document.getElementById("butonDreapta");

    let raspunsSpateDIV = document.getElementById("titluSpate");
    raspunsSpateDIV.children[0].textContent = dataRaspunsuri[INDEXCARTON][dataRaspunsuri[INDEXCARTON][4] - 1];

    butonstanga.setAttribute("onclick", `switchCartonas(-1, ${INDEXCARTON})`);
    butondreapta.setAttribute("onclick", `switchCartonas(1, ${INDEXCARTON})`);

    intrebare.textContent = dataIntrebari[INDEXCARTON];
    for (let rasp of raspunsuri)
        rasp.children[0].textContent = `${raspunsuri.indexOf(rasp) + 1}. ` + dataRaspunsuri[INDEXCARTON][raspunsuri.indexOf(rasp)];
}


function dezvaluieCartonas(state) {
    if (state == 0) document.getElementById("cartonas-showcase").style.transform = "rotateY(180deg)";
    else if (state == 1) document.getElementById("cartonas-showcase").style.transform = "rotateY(0deg)";
    else console.log("error turning the cartonas :(");
}

function switchCartonas(direction, indexfrom) {
    if (animationRunning) return;

    // console.log(document.getElementById("intrebare-cartonas").textContent, Number(JSON.parse(localStorage.getItem(localStorageEntry)).intrebari.indexOf(document.getElementById("intrebare-cartonas").textContent) + 1)

        
    // intoarce cartonasul pe fata in caz ca e pe spate
    dezvaluieCartonas(1);

    if (indexfrom == 0 && direction == -1) indexfrom = JSON.parse(localStorage.getItem(localStorageEntry)).intrebari.length - 1;
    else if (indexfrom == JSON.parse(localStorage.getItem(localStorageEntry)).intrebari.length - 1 && direction == 1) indexfrom = 0;
    else indexfrom += direction;

    document.getElementById("counterCartonase").textContent = 
        indexfrom + 1
        + " / " 
        + JSON.parse(localStorage.getItem(localStorageEntry)).intrebari.length; 

    transitionOff();
    setTimeout(() => {
        setupCartonas(indexfrom);
        setTimeout(() => {
            transitionOn();
            
        }, 100);
    }, (animationTime) * 1000);
}

function transitionOff() {
    animationRunning = true;

    let cartonas = document.getElementById("cartonas-showcase");
    cartonas.style.animation = `cartonasOff ${animationTime}s forwards`;
}

function transitionOn() {
    let cartonas = document.getElementById("cartonas-showcase");
    cartonas.style.animation = `cartonasOn ${animationTime}s`;

    cartonas.addEventListener("animationend", () => {
        setTimeout(() => {animationRunning = false;}, 100);
    })
}