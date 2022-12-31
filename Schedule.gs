let WEEKDAYS = function () {
  let weekdays = {
    1: "Понеділок",
    2: "Вівторок",
    3: "Середа",
    4: "Четвер",
    5: "П'ятниця",
    6: "Субота",
    7: "Неділя",
  }

  return {
    getName: function (weekday) {
      return weekdays[weekday];
    }
  }
}();


function getSchedule() {
  let rows = SpreadsheetApp.getActiveSheet().getDataRange().getValues();

  let schedule = "";
  let lastDay = "";
  rows.forEach(function (value) {
    let weekDay = WEEKDAYS.getName(value[0]);
    let start = timeString(value[1]);
    let end = timeString(value[2]);

    if (weekDay !== lastDay) {
      lastDay = weekDay;
      schedule += "```\n```\n" + weekDay + ":\n";
    }
    schedule += `${start} - ${end}\n`;
  })

  schedule += "```";

  return schedule.slice(4);
}
