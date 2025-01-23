function checkForShorten(maxlen, showlen, str) {
    if (str.length <= maxlen) return str;
    
    let newStr = str.substr(0, showlen) + " [...] " + str.substr(str.length - showlen);
    return newStr;
}

function toBool(val) {
    if (val) return 1;
    return 0;
}