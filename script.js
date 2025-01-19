const localStorageEntry = "JSONData"
const defaultJSONStructure = {
    "intrebari": [],
    "raspunsuri": []
}

window.addEventListener("load", (ev) => {
    // console.log(JSON.parse(localStorage.getItem(localStorageEntry))["raspunsuri"].includes(["1", " 2", " 3", " 4", " 1"]))
    checkLocalStorage(localStorageEntry, defaultJSONStructure);
    // updateData(localStorageEntry, "intrebari", "balls");
})


function checkEmpty(text) {
    let textArr = text.split("");
    for (i in textArr)
        if (textArr[i] != " ") return false;
    
    return true;
}


function addInputData(inputIDs) {
    const inputQuestion = document.getElementById(inputIDs[0]).value;
    const inputAnswerString = document.getElementById(inputIDs[1]).value;
    const inputAnswers = inputAnswerString.split(",");

    console.log(inputAnswers);
    if (inputQuestion == "clear") { clearStorage(); return; }


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

    creeazaCartonas(dataObj.intrebari.length - 1);
}

function clearStorage() {
    let container = document.getElementById("container-cartonase");
    for (let node in container.children) {
        // if (node.getAttribute("id") == "cartonasEntry") continue;
        if (typeof(container.children[1]) == "undefined") break;
        
        container.removeChild(container.children[1]);
    }

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
    clearStorage();

    setTimeout(() => {
        let file = document.getElementById("fileinput").files[0];
    
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
            
            localStorage.setItem(localStorageEntry, contents);
        };
        reader.readAsText(file);
        setTimeout(() => {
            checkCartonase();
        }, 100);

    }, 100);
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