const maxIntrebareLength = 35;
const butcheredTextLength = 15;

// creeaza pentru fiecare intrebare un cartonas
window.addEventListener("load", () => {
    checkCartonase();
})

function checkCartonase() {
    for (dataIndex in JSON.parse(localStorage.getItem(localStorageEntry)).intrebari)
        creeazaCartonas(dataIndex);
}


function creeazaCartonas(cartonasIndex) {
    const dataObj = JSON.parse(localStorage.getItem(localStorageEntry))
    const question = dataObj.intrebari;
    const answers = dataObj.raspunsuri;

    let mainContainer = document.createElement("div");

    let frontContainer = document.createElement("div");
    let backContainer = document.createElement("div");
    let topbarContainer = document.createElement("div");
    let intrebare = document.createElement("h3");
    let listaRaspunsuri = document.createElement("ol");
    let x = document.createElement("a");
    let edit = document.createElement("a");

    let afiseaza = document.createElement("a");
    let ascunde = document.createElement("a");

    mainContainer.className = "cartonas";
    mainContainer.id = question[cartonasIndex];
    topbarContainer.className = "cartonas-topbar";
    intrebare.className = "titlu-cartonas";

    frontContainer.className = "cartonasFata";
    backContainer.className = "cartonasSpate";
    
    x.className = "cartonas-link";
    x.id = cartonasIndex;
    x.textContent = "X"
    x.setAttribute("onclick", `deleteCartonasAndData(${cartonasIndex})`)

    edit.className = "cartonas-link";
    edit.textContent = "✏";
    edit.setAttribute("onclick", `openModal(${cartonasIndex})`)
    

    intrebare.textContent = checkForShorten(maxIntrebareLength, butcheredTextLength, question[cartonasIndex]);


    for (ans in answers[cartonasIndex]) {
        if (ans == 4) break;
        
        let raspuns = document.createElement("li");
        raspuns.textContent = checkForShorten(20, 7, answers[cartonasIndex][ans]);

        listaRaspunsuri.appendChild(raspuns);
    }

    afiseaza.textContent = "Afiseaza"
    afiseaza.setAttribute("id", "showhideLink");
    afiseaza.setAttribute("onclick", `flipCartonas(${cartonasIndex}, 0)`);
    afiseaza.className = "cartonas-link";
    ascunde.textContent = "Ascunde";
    ascunde.setAttribute("id", "showhideLink");
    ascunde.style.paddingBottom = "5px";
    ascunde.setAttribute("onclick", `flipCartonas(${cartonasIndex}, 1)`);
    ascunde.className = "cartonas-link";

    topbarContainer.appendChild(edit);
    topbarContainer.appendChild(x);
    
    frontContainer.appendChild(topbarContainer);
    frontContainer.appendChild(intrebare);
    frontContainer.appendChild(listaRaspunsuri);
    frontContainer.appendChild(document.createElement("br"));
    frontContainer.appendChild(afiseaza);

    let raspunsCorect = document.createElement("h3");
    raspunsCorect.textContent = checkForShorten(maxIntrebareLength, butcheredTextLength, answers[cartonasIndex][answers[cartonasIndex][4] - 1]);
    backContainer.appendChild(raspunsCorect);
    backContainer.appendChild(ascunde);

    mainContainer.appendChild(frontContainer);
    mainContainer.appendChild(backContainer);
    
    document.getElementById("container-cartonase").appendChild(mainContainer);
    
}


function deleteCartonasAndData(index) {
    document.getElementById(index).parentElement.parentElement.parentElement.remove();
    const dataObj = JSON.parse(localStorage.getItem(localStorageEntry));

    dataObj.intrebari.splice(index, 1);
    dataObj.raspunsuri.splice(index, 1);

    localStorage.setItem(localStorageEntry, JSON.stringify(dataObj));

    // Update index IDs
    const container = document.getElementById("container-cartonase");
    
    for (let i of container.children) {
        if (i.getAttribute("id") == "cartonasEntry") continue; // cartoansul cu ajutorul caruia adaugi

        let xNode = i.children[0].children[0].children[1];
        let editNode = i.children[0].children[0].children[0];
        let afiseazaNode = i.children[0].children[4];

        let correctID = dataObj.intrebari.indexOf(i.getAttribute("id"));

        xNode.setAttribute("id", correctID);
        xNode.setAttribute("onclick", `deleteCartonasAndData(${correctID})`);

        editNode.setAttribute("onclick", `openModal(${correctID})`);

        afiseazaNode.setAttribute("onclick", `flipCartonas(${correctID})`);
    }
}


function flipCartonas(index, flipTurn) {
    const dataObj = JSON.parse(localStorage.getItem(localStorageEntry))
    const question = dataObj.intrebari;
    const answers = dataObj.raspunsuri;

    let mainContainer = document.getElementById("container-cartonase");
    let cartonasNode;

    for (let cartonas of mainContainer.children)
        if (cartonas.getAttribute("id") == question[index]) {
            cartonasNode = cartonas;
            break;
        }
    
    if (flipTurn == "0") 
        cartonasNode.style.transform = "rotateY(180deg)";
    
    else cartonasNode.style.transform = "rotateY(0deg)";
}
