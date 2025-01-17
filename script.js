const localStorageEntry = "JSONData"
const defaultJSONStructure = {
    "intrebari": [],
    "raspunsuri": []
}

window.addEventListener("load", (ev) => {
    checkLocalStorage(localStorageEntry, defaultJSONStructure);
    // updateData(localStorageEntry, "intrebari", "balls");
})



function checkEmpty(text) {
    let textArr = text.split("");
    for (i in textArr)
        if (textArr[i] != " ") return false;
    
    return true;
}

function addQuestion(inputId) {
    const inputForm = document.getElementById(inputId);
    const inputValue = inputForm.value;

    if (inputValue == "clear") { localStorage.clear(); return; }

    // Check for invalid input
    if (inputValue.length == 0 || checkEmpty(inputValue)) {
        alert("Te rog introdu o intrebare valida.");
        return;
    }

    updateData(localStorageEntry, "intrebari", inputValue);

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

function updateData(data, key, value) {
    let dataObj = JSON.parse(localStorage.getItem(data));
    
    if(existsIn(dataObj, key, value)) { alert("exista deja intrebarea"); return; }

    dataObj[key].push(value);
    console.log(dataObj);

    localStorage.setItem(data, JSON.stringify(dataObj));

    // fetch json data
        // fetch(jsonPath).then(
        //     response => { return response.json(); }
        // ).then(
        //     data => {
        //         console.log(data);
        //         var cpy = data[key];
        //         // console.log(data.intrebari, typeof(data.intrebari))
        //         cpy.push(value);
        //         console.log("cpu", cpy);
        //     }
        // )

        // fetch(jsonPath).then(
        //     response => {return response.json();}
        // ).then(
        //     data => {
        //         console.log(data);
        //     }
        // )
    
}

function existsIn(obj, key, value) {
    return obj[key].includes(value);
}