window.addEventListener("load", () => {
    setupOptionsTable();
})

const translations = {
    "afiseaza_raspunsuri_on_showcase": "Afișează răspunsurile pe pagina START",

    "true": "Pornit",
    "false": "Oprit"
}

function setupOptionsTable() {
    const options = JSON.parse(localStorage.getItem(optionsEntry));
    let table = document.getElementById("options-table");
    let tableBody = table.getElementsByTagName('tbody')[0];

    for (let [key, value] of Object.entries(options)) {
        // console.log(key, typeof(key));

        let tr = document.createElement("tr");
        let tdProperty = document.createElement("td");
        let tdValue = document.createElement("td");
        let optionVal;

        // check type for optionVal
        switch(typeof(value)) {
            case "boolean": {
                optionVal = document.createElement("h3");
                optionVal.textContent = translate(value);
                optionVal.setAttribute("id", key);
                optionVal.setAttribute("class", "option-boolean");
                optionVal.setAttribute("onclick", `switchVal(${key}, ${toBool(value)})`); // parses node instead of string for some reason
                
                if (value == false) optionVal.style.color = RED;
                else optionVal.style.color = VALID;

                tdValue.appendChild(optionVal);
                break;
            }

            default:
                console.log("ERROR declaring setting value");
        }

        tdProperty.textContent = translate(key);
        // tdValue.textContent = translate(value);
        tr.appendChild(tdProperty);
        tr.appendChild(tdValue);

        tableBody.appendChild(tr);
    }
}


function translate(str) {
    if (!(str in translations)) return str;
    return translations[str];
}


function switchVal(keyNode, toVal) {
    // cumva e pe invers
    if (toVal == '1') keyNode.style.color = RED;
    else keyNode.style.color = VALID;
    
    let key = keyNode.id;

    let optionsval = JSON.parse(localStorage.getItem(optionsEntry));
    optionsval[key] = !optionsval[key];

    if (toVal == 1) toVal = 0;
    else toVal = 1;

    keyNode.textContent = translate(optionsval[key]);
    keyNode.setAttribute("onclick", `switchVal(${key}, ${toVal})`);

    localStorage.setItem(optionsEntry, JSON.stringify(optionsval));
}

function getIndexInObj(obj, key) {
    let index = 0;
    for (let [i, value] of Object.entries(obj)) {
        if (i == key) return index;
        index += 1;
    }

    return -1;
}