const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '6324244433:AAFI3b3NK4lM5lti1uK4WPk_65kvp37Pkwk';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

var options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'CESSO SX 🚽', callback_data: 'SX' }],
          [{ text: 'CESSO DX 🚽', callback_data: 'DX' }],
          [{ text: 'CESSO NON DEFINITO 🚽', callback_data: 'unknown' }],
          [{ text: '🚨ALLARME RIENTRATO🚨', callback_data: 'none' }],
          [{ text: 'Falso allarme, sono un colione', callback_data: 'cancel'}]
        ]
      })
    };

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;
  bot.deleteMessage(opts.chat_id, opts.message_id)

  if (action === 'SX') {
    bot.sendMessage(msg.chat.id, 'CESSO SINISTRO FUORI USO');
  } else if (action === 'DX') {
    bot.sendMessage(msg.chat.id, 'CESSO DESTRO FUORI USO');
  } else if (action === 'unknown'){
    bot.sendMessage(msg.chat.id, 'CESSO INDEFINITO, PREPARIAMOCI AL PEGGIO');
  } else if (action === 'cancel') {

  } else {
    bot.sendMessage(msg.chat.id, 'È tornato, speriamo bene');
  }
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
//console.log(msg)
  // send a message to the chat acknowledging receipt of their message
  if (msg.text.toLowerCase().includes('allarme') || msg.text.toLowerCase().includes('alarme')) {
    //console.log(msg)
    bot.sendMessage(chatId, '🚨 ALLARME!!!! NIENTE PANICO, ANDRÀ TUTTO BENE 🚨', options);
  }
});
