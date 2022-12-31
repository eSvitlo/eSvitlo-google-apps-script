function getText(n, ...plurals) {
  return plurals[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}


function timeString(date, leadingZero = true) {
  return String(date.getHours()).padStart(2, leadingZero ? "0" : "") + ":" + String(date.getMinutes()).padStart(2, "0");
}
