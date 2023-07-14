const { Client, GatewayIntentBits } = require("discord.js");
const { config } = require("dotenv");

config();

const token = process.env.token;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(client.user.tag, "is online");
});

client.on("messageCreate", async (message) => {
  if (message.channelId != "1129262390681284628") {
    return;
  }
  if (message.author.bot) {
    return;
  }
  const regexPattern = /^test(\d+)$/; // Regex pattern to match "test" followed by one or more digits

  const content = message.content.trim(); // Trim any leading/trailing whitespace

  if (regexPattern.test(content)) {
    const match = regexPattern.exec(content);
    const number = match[1]; // Extract the captured number

    console.log(`Received valid input: ${content} (Number: ${number})`);
    message.reply(`Test ${number} is being conducted. Please wait`);
  } 
});

process.on('message', (message) => {
  if (message === 'trigger-event') {

    console.log('User was logged in');
  }
});
client.login(token);
