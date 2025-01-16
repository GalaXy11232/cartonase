const data = require('./intrebari.json')
console.log(data.intrebari);

function returntext() {
    const inputform = document.getElementById("typeinput");
    alert(inputform.value);
}