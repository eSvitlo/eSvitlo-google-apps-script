const token = "<NNN:XXXXX>";
const url = "https://api.telegram.org/bot" + token + "/sendMessage";


function sendMessage(payload){
  let options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  }
  return UrlFetchApp.fetch(url, options);
}
