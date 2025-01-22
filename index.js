const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const express = require('express');
const { Thread } = require('worker_threads');
const app = express();

const { Client } = require('discord.js-selfbot-v13')

const client = new Client({
    checkUpdate: false
});

client.on('ready', async () => {
    console.log("Client is ready")
});

app.get('/', (req, res) => {
    res.send("Hello, I am alive!");
});

function run() {
    app.listen(8080, '0.0.0.0', () => {
        console.log('Server is running on port 8080');
    });
}

function keepAlive() {
    const t = new Thread(run);
    t.run();
}

const intents = new Intents(Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MESSAGES | Intents.FLAGS.GUILD_MEMBERS);
const bot = new Client({ intents });

const serverAd = `
**Jesteś doświadczonym programistą i szukasz forum, gdzie uzyskasz wsparcie i podzielisz się efektem swojej pracy? A może dopiero zaczynasz swoją przygodę z kodowaniem? Niezależnie od stopnia zaawansowania zapraszamy na nasz serwer programistyczny.**

Co oferujemy:
- pomoc programistyczną,
- kanały dostosowane do różnych języków programistycznych,
- sklep z itemami,
- miejsce, gdzie znajdziesz ludzi z pasją,
- stały rozwój serwera.

Kogo szukamy:
- programistów,
- administracji,
- aktywnych użytkowników,
- realizatorów partnerstw.
https://discord.gg/pPss9qWZ6p
https://share.creavite.co/67646e7f0ae0e4f686a629f9.gif
https://share.creavite.co/67646f950ae0e4f686a62a01.gif
`;

const partneringUsers = {};

client.on('ready', () => {
    console.log(`Bot ${bot.user.tag} jest gotowy.`);
});

client.on('messageCreate', async (message) => {
    if (message.author.id === client.user.id) return;

    if (message.content.toLowerCase().includes("partner") && !partneringUsers[message.author.id]) {
        partneringUsers[message.author.id] = null;
        await message.channel.send("🌎 Witaj! Jeśli chcesz nawiązać partnerstwo, wyślij proszę swoją reklame (maksymalnie 1 serwer).");
    } else if (partneringUsers[message.author.id]) {
        if (partneringUsers[message.author.id] === null) {
            partneringUsers[message.author.id] = message.content; // Store user's ad content
            await message.channel.send(`✅ Świetnie! Teraz wstaw naszą reklamę:\n${serverAd}`);
            await message.channel.send("⏰ Daj znać gdy wstawisz reklamę, a wtedy my wstawimy twoją!");
        } else if (message.content.toLowerCase().includes("wstawi")) {
            const guild = client.guilds.cache.get('1316466087570706432');
            if (guild && !guild.members.cache.has(message.author.id)) {
                await message.channel.send("❕ Zanim kontynuujemy, musisz dołączyć na serwer!");
            } else {
                const channel = guild.channels.cache.find(channel => channel.name === "🤝partnerstwa"); // Partnerstwa channel name
                if (channel) {
                    const userAd = partneringUsers[message.author.id];
                    await channel.send(userAd); // Post user's ad in the partnership channel
                    await message.channel.send("✅ Dziękujemy za nawiązanie partnerstwa!");
                    delete partneringUsers[message.author.id]; // Remove user from partnership list after process completion
                }
            }
        }
    }
});

keepAlive();

try {
    const token = process.env.DISCORD_TOKEN;
    client.login(token);
} catch (e) {
    console.error(`Error: ${e}`);
    throw e;
}

