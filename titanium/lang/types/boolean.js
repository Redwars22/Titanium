function parseBoolean(value) {
    if (value == keywords.BOOL_TRUE)
        return true;
    if (value == keywords.BOOL_FALSE)
        return false;
}
function checkIfIsBoolean(value) {
    if (value.includes(keywords.BOOL_TRUE) || value.includes(keywords.BOOL_FALSE))
        return true;
    return false;
}
