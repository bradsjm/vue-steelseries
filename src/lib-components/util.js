function toBoolean(value) {
  if ("boolean" === typeof value || undefined === value) return value;
  switch (
    value
      .toString()
      .toLowerCase()
      .trim()
  ) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return Boolean(value);
  }
}

function toNumber(value) {
  return "number" === typeof value || undefined === value
    ? value
    : Number(value);
}

export { toNumber, toBoolean };
