function checkForShorten(maxlen, showlen, str) {
    if (str.length <= maxlen) return str;
    
    let newStr = str.substr(0, showlen) + " [...] " + str.substr(str.length - showlen);
    return newStr;
}