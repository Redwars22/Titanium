function parseBoolean(value) {
  if (value == keywords.BOOL_TRUE || value == keywords.BOOL_YES) return true;

  if (value == keywords.BOOL_FALSE || value == keywords.BOOL_NO) return false;
}

function checkIfIsBoolean(value): boolean {
  if (
    value.includes(keywords.BOOL_TRUE) ||
    value.includes(keywords.BOOL_FALSE) ||
    value.includes(keywords.BOOL_YES) ||
    value.includes(keywords.BOOL_NO)
  )
    return true;

  return false;
}
