const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Serwer HTTP do utrzymania aktywności
app.get("/", (req, res) => {
  res.send("Self-bot działa!");
});

app.listen(PORT, () => {
  console.log(`Serwer pingujący działa na porcie ${PORT}`);
});

// Tutaj dodaj kod self-bota Discord
const { Client } = require("discord.js");
const client = new Client();

client.on("ready", () => {
  console.log("Self-bot gotowy!");
});

client.login(process.env.TOKEN);
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "!ping") {
    message.reply("Pong z Render! 🚀");
  }
});

client.login(process.env.DISCORD_TOKEN);
