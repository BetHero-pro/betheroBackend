const express = require('express');
const userRoutes = require('./routes/userRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const questRoutes = require('./routes/questRoutes');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
const bodyparser = require('body-parser');
const MONGO_URI = 'mongodb+srv://jay0x5:gD0VkqYWlM09CeHF@cluster0.6qywtog.mongodb.net/?retryWrites=true&w=majority';
const cors = require('cors');
const { Client, IntentsBitField } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ],
});
// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const BOT_TOKEN = token;
// Discord setup

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', e => {
  console.log(e);
});

const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
// Routes
app.use('/', userRoutes);
app.use('/', playlistRoutes);
app.use('/quests', questRoutes);

async function sendToDiscord(message) {
  try {
    const channel = '1117132936274264255'; // Replace with your actual Discord channel ID

    const discordChannel = await client.channels.fetch('1117132936274264255');
    console.log(discordChannel);
    if (!discordChannel) {
      console.error(`Channel with ID ${channel} not found.`);
      return;
    }
    await discordChannel.send(message);
  } catch (error) {
    console.error('Error sending message to Discord:', error);
  }
}

const { setupUtils } = require('./utils/utils.js');
setupUtils(client);

// App Start
app.listen(PORT, '0.0.0.0', () => {
  console.log('Listening on Port: ' + PORT);
  if (BOT_TOKEN === 'false') {
    console.log('no token for bot');
  } else {
    client.login(BOT_TOKEN);
  }
  // setTimeout(() => {
  //   sendToDiscord("madara احمق")
  // }, 8000);
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connection Established...');
  })
  .catch(err => {
    console.log(err);
  });

// You can export other functions or variables here if needed
