const jsonPath = "./intrebari.json"

window.addEventListener("load", (ev) => {
    updateJsonData("intrebari", "balls");
})



function checkEmpty(text) {
    let textArr = text.split("");
    for (i in textArr)
        if (textArr[i] != " ") return false;
    
    return true;
}

function addQuestion() {
    const inputForm = document.getElementById("typeinput");
    const inputValue = inputForm.value;

    // Check for invalid input
    if (inputValue.length == 0 || checkEmpty(inputValue)) {
        alert("Te rog introdu o intrebare valida.");
        return;
    }

    updateJsonData("intrebari", inputValue);

}


function updateJsonData(key, value) {
    // fetch json data
    let jsonData;

    fetch(jsonPath).then(
        response => { return response.json(); }
    ).then(
        data => {
            console.log(data);
            data.intrebari.push("afuihi");
            console.log(data);
        }
    )

    // fetch(jsonPath).then(
    //     response => {return response.json();}
    // ).then(
    //     data => {
    //         console.log(data);
    //     }
    // )
    
    
}