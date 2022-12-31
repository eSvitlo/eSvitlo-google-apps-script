const subscribe = "t.me/<channel_name>";

const SHOW = "🗓️ Показати графік";
const NEXT = "⏱️ Наступне відключення";

function doPost(e) {
  let content = JSON.parse(e.postData.contents);

  let payload = {
    chat_id: content.message.chat.id,
    parse_mode: "markdown",
    reply_markup: {
      inline_keyboard: [[{
        text: "📨 Підписатися",
        url: subscribe,
      }]]
    }
  }

  switch (content.message.text) {
    case "/start":
      payload.text = "Вітаю! 👋";
      payload.reply_markup = {
        keyboard: [
          [NEXT],
          [SHOW],
        ],
        is_persistent: true,
        resize_keyboard: true,
      }
      sendMessage(payload);
      break;
    case SHOW:
      payload.text = getSchedule();
      sendMessage(payload);
      break;
    case NEXT:
      payload.text = getNextShutdown();
      sendMessage(payload);
      break;
  }

  return HtmlService.createHtmlOutput();
}
