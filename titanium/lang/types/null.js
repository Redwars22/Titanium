function checkIfIsNull(value) {
    if (value.includes(types.NULL))
        return true;
    return false;
}
function checkIfIsUndefined(value) {
    if (value.includes(types.UNDEFINED))
        return true;
    return false;
}
function parseNullValue(value) {
    switch (value) {
        case types.NULL:
            return "NULL";
            break;
        case types.UNDEFINED:
            return "UNDEFINED";
            break;
        default:
            break;
    }
}
