function getDaySchedule(rows, date) {
  let weekday = date.getDay() || 7;

  let result = [];
  rows.forEach(function (value) {
    if (value[0] === weekday) {
      let /** @type {Date} */ newDate = value[1];
      newDate.setFullYear(date.getFullYear());
      newDate.setMonth(date.getMonth());
      newDate.setDate(date.getDate());

      result.push(newDate);
    }
  });

  return result;
}


function getNextShutdown() {
  let rows = SpreadsheetApp.getActiveSheet().getDataRange().getValues();

  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let schedule = [...getDaySchedule(rows, today), ...getDaySchedule(rows, tomorrow)];

  for (let i = 0; i < schedule.length; i++) {
    var value = schedule[i];
    var diff = Math.ceil((value - today) / 60000);
    if (diff > 0) {
      break;
    }
  }

  let afterHours = Math.floor(diff / 60);
  let afterMinutes = diff % 60;

  let hoursLabel = getText(afterHours, "годину", "години", "годин");
  let minutesLabel = getText(afterMinutes, "хвилину", "хвилини", "хвилин");

  let day = value.getDay() == today.getDay() ? "сьогодні" : "завтра";
  let preposition = value.getHours() == 11 ? "об" : "о";
  let time = timeString(value, false);

  let afterHoursFull = afterHours ? `${afterHours} ${hoursLabel} ` : "";
  let afterMinutesFull = afterMinutes || !afterHours ? `${afterMinutes} ${minutesLabel}` : "";

  let msg = `Наступне стабілізаційне відключення:\n*${day} ${preposition} ${time}*\n_через ${afterHoursFull}${afterMinutesFull}_`;
  return msg;
}
