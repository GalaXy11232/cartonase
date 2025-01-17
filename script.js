const localStorageEntry = "JSONData"
const defaultJSONStructure = {
    "intrebari": [],
    "raspunsuri": []
}
//ferestra.adaugaAscultatorDeEvenimente();
window.addEventListener("load", (ev) => {
    // console.log(JSON.parse(localStorage.getItem(localStorageEntry))["raspunsuri"].includes(["1", " 2", " 3", " 4", " 1"]))
    checkLocalStorage(localStorageEntry, defaultJSONStructure);
    // updateData(localStorageEntry, "intrebari", "balls");
})



function checkEmpty(text) {
    // if (isList) {
    //     for (i in text) {
    //         let textArr = i.split("");
    //         for (j in textArr)
    //             if (textArr[j] != " ") return false;
            
    //         return true;
    //     }  
    // }

    let textArr = text.split("");
    for (i in textArr)
        if (textArr[i] != " ") return false;
    
    return true;
}

//gen adauga date de input gen gen gen gen
function addInputData(inputIDs) {

    const inputQuestion = document.getElementById(inputIDs[0]).value;
    const inputAnswerString = document.getElementById(inputIDs[1]).value;
    const inputAnswers = inputAnswerString.split(",");

    console.log(inputAnswers);
    if (inputQuestion == "clear") { localStorage.clear(); return; }
    // if (inputQuestion == "skib") { download(localStorage.getItem(localStorageEntry), 'intrebari.json'); return; }

    // Check for invalid input
    if (
        inputQuestion.length == 0 || inputAnswerString.length == 0 || inputAnswers.length == 0 ||
        checkEmpty(inputAnswerString) || checkEmpty(inputQuestion)
    ) {
        alert("Te rog introdu o intrebare valida.");
        return;
    }

    if (isNaN(inputAnswers[4]) || Number(inputAnswers[4]) < 1 || Number(inputAnswers[4]) > 4) { 
        alert ("Te rog alege un numar intre 1 si 4 pentru a determina varianta corecta!"); 
        return; 
    }


    // Update localStorage
    updateData(inputQuestion, inputAnswers);

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

function updateData(question, answers) {
    let dataObj = JSON.parse(localStorage.getItem(localStorageEntry));
    
    if (dataObj.intrebari.includes(question)) { 
        alert("exista deja intrebarea"); 
        return; 
    }


    dataObj.intrebari.push(question);
    dataObj.raspunsuri.push(answers);

    localStorage.setItem(localStorageEntry, JSON.stringify(dataObj));

}

function clearStorage() {
    localStorage.clear();
    localStorage.setItem(localStorageEntry, JSON.stringify(defaultJSONStructure));
}


// If equal arrays, return true
function checkArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) 
        if (arr1[i] !== arr2[i]) return false;

    return true;
}

function existsIn(obj, key, value) {
    return obj[key].includes(value);
}




function loadfile() {
    let file = document.getElementById("fileinput").files[0];
    
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        
        localStorage.setItem(localStorageEntry, contents)
    };
    reader.readAsText(file);
}

function savefile() {
    let blob = new Blob([localStorage.getItem(localStorageEntry)], {type: "application/json"})
    
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "intrebari.json";
    a.click();

    clearStorage();
    a.remove();
    URL.revokeObjectURL(url);
}