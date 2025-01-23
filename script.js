const GREEN = "rgb(0, 255, 0)";
const RED = "rgb(255, 0, 0)";
const VALID = "rgb(0, 175, 0)";


const localStorageEntry = "JSONData"
const optionsEntry = "options"

const defaultJSONStructure = {
    "intrebari": [],
    "raspunsuri": []
}

const defaultOptions = {
    "afiseaza_raspunsuri_on_showcase": true
}



window.addEventListener("load", (ev) => {
    // console.log(JSON.parse(localStorage.getItem(localStorageEntry))["raspunsuri"].includes(["1", " 2", " 3", " 4", " 1"]))
    checkLocalStorage(localStorageEntry, defaultJSONStructure);
    checkLocalStorage(optionsEntry, defaultOptions, 1);

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


function checkLocalStorage(entry, value, mode = 0) {
    // 0 - load; 1 - check and add for new; 2 - deep modify (unused)
    // console.log(Object.keys(JSON.parse(localStorage.getItem(entry))).length, Object.keys(value).length)
    // for (let ans of Object.values(value)) console.log(value, ans);
    
    if (localStorage.getItem(entry) == null) {
        localStorage.setItem(entry, JSON.stringify(value));

        console.log(`created new Storage for ${entry}, `, JSON.parse(localStorage.getItem(entry)));
        return;
    }

    // update from preset object to localstorage
    else if (Object.keys(JSON.parse(localStorage.getItem(entry))).length != Object.keys(value).length) {
        let q = JSON.parse(localStorage.getItem(entry));


        var Vvals = [];
        var Qvals = []
        for (let [key, val] of Object.entries(q)) Qvals.push([key, val]);
        for (let [key, val] of Object.entries(value)) Vvals.push([key, val]);

        q = value;
        
        for (let ix in Vvals) 
            if (ix < Qvals.length) q[Vvals[ix][0]] = Qvals[ix][1];
            else q[Vvals[ix][0]] = Vvals[ix][1];

        
        localStorage.setItem(entry, JSON.stringify(q));

        console.log(`updated localStorage for ${entry}!`);
        return;
    }


    console.log(`loaded localStorage for ${entry}!`);
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

function clearStorage(entry) {
    let defaultEntry;

    if (entry == localStorageEntry) defaultEntry = defaultJSONStructure;
    else defaultEntry = null;

    if (entry == localStorageEntry) {
        let container = document.getElementById("container-cartonase");
        for (let node in container.children) {
            if (typeof(container.children[1]) == "undefined") {console.log("bkera"); break; }
            
            container.removeChild(container.children[1]);
        }

        localStorage.setItem(entry, JSON.stringify(defaultEntry));
        // localStorage.setItem(localStorageEntry, JSON.stringify(defaultJSONStructure));
    }
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
    clearStorage(localStorageEntry);

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
        }, 300);

    }, 500);
}

function savefile() {
    if (JSON.parse(localStorage.getItem(localStorageEntry)).intrebari.length == 0) {
        alert("Nu poti salva un fisier gol. Te rog creează cel puțin un cartonaș.");
        return;
    }

    let blob = new Blob([localStorage.getItem(localStorageEntry)], {type: "application/json"})
    
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "intrebari.json";
    a.click();

    clearStorage(localStorageEntry);
    a.remove();
    URL.revokeObjectURL(url);
}