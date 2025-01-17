const localStorageEntry = "JSONData"
const defaultJSONStructure = {
    "intrebari": [],
    "raspunsuri": []
}
//ferestra.adaugaAscultatorDeEvenimente();
window.addEventListener("load", (ev) => {
    checkLocalStorage(localStorageEntry, defaultJSONStructure);
    // updateData(localStorageEntry, "intrebari", "balls");
})

//e gol? sau nu e gol... asta e intrebarea.
function checkEmpty(text, isList = false) {
    let textArr = text.split("");
    for (i in textArr)
        if (textArr[i] != " ") return false;
    
    return true;
}

//gen adauga date de input gen gen gen gen
function addInputData(inputIDs) {
    //apropo vezi ca am dat sa faca split dupa VIRGULA.
    const inputQuestion = document.getElementById(inputIDs[0]).value;
    const inputAnswers = document.getElementById(inputIDs[1]).value.split(",");

    console.log(inputAnswers);
    if (inputQuestion == "clear") { localStorage.clear(); return; }

    //input valid OR NAH
    if (inputQuestion.length == 0 || checkEmpty(inputQuestion)) {
        alert("Te rog introdu o intrebare valida.");
        return;
    }

    updateData(localStorageEntry, "intrebari", inputQuestion);

}

//gen verifica acolo la intrebari sa vada daca totu e chill
function checkLocalStorage(entry, value) {
    if (localStorage.getItem(entry) == null) {
        localStorage.setItem(entry, JSON.stringify(value));

        console.log("created new localStorage!", JSON.parse(localStorage.getItem(entry)));
    
        return;
    }

    console.log("loaded localStorage!");
    return true;
}

//gen la fel ca inainte doar ca se ingroasa gluma
function updateData(data, key, value) {
    let dataObj = JSON.parse(localStorage.getItem(data));
    
    if(existsIn(dataObj, key, value)) { alert("exista deja intrebarea"); return; }

    dataObj[key].push(value);
    console.log(dataObj);

    localStorage.setItem(data, JSON.stringify(dataObj));
}

function existsIn(obj, key, value) {
    return obj[key].includes(value);
}