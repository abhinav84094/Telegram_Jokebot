const TelegramBot = require('node-telegram-bot-api');
const token = '7563234680:AAHIOLZGt6N2XDQRduqunL0FESrgy2T4FLI';
const bot = new TelegramBot(token, {polling: true});

bot.on('message' , (msg)=>{
    console.log(msg);
})

const axios = require('axios');

bot.onText(/joke/, async (msg) => {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const setup = response.data.setup;
        const punchline = response.data.punchline;
        bot.sendMessage(msg.chat.id, `${setup}, ${punchline}`);
    } catch (error) {
        console.error('Error fetching joke:', error);
        bot.sendMessage(msg.chat.id, 'Sorry, I could not fetch a joke at the moment. Please try again later.');
    }
});



bot.on('message', (msg) => {
    if (!msg.text.includes('joke')) {
        bot.sendMessage(msg.chat.id, "Type 'joke' for a joke.");
    }
});