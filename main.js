const { Client, Intents } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;

// Konfiguracja klienta Discord
const client = new Client({
  checkUpdate: false,
});

// Serwer HTTP do utrzymania aktywności na Render (dla darmowego tieru)
app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});

app.listen(PORT, () => {
  console.log(`Serwer pingujący działa na porcie ${PORT}`);
});

// Obsługa zdarzeń Discorda
client.once('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}!`);
});

// Reklama serwera
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

// Lista użytkowników partnerstwa
const partneringUsers = new Map();

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy.`);
  // Wysyłanie wiadomości co 6 minut
  const channelId_partnerstwa = '1252280791946235915';
  const serverId = '1175916293816332318';
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId);
    if (channel) {
      await channel.send('# PARTNERSTWA PV');
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId_partnerstwa}`);
    }
  }, 6 * 60 * 1000); // 6 minut w milisekundach

  // reklamowanie serwera
  const channelId_programming = '1252290252328927353';
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_programming);
    if (channel) {
      await channel.send(serverAd);
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId}`);
    }
  }, 11 * 60 * 1000); // 6 minut w milisekundach
});

client.on('messageCreate', async (message) => {
  // Sprawdzenie, czy wiadomość pochodzi od innego użytkownika i czy zawiera cząstkę 'partner'
  if (!message.guild && !message.author.bot && message.author.id !== client.user.id) {
    if (message.content.toLowerCase().includes('partner') && !partneringUsers.has(message.author.id)) {
      partneringUsers.set(message.author.id, null);
      await message.channel.send("🌎 Wyślij swoją reklamę (maksymalnie 1 serwer).");
    } else if (partneringUsers.has(message.author.id)) {
      const userAd = partneringUsers.get(message.author.id);

      if (userAd === null) {
        partneringUsers.set(message.author.id, message.content);
        await message.channel.send(`✅ Wstaw naszą reklamę:\n${serverAd}`);
        await message.channel.send("⏰ Daj znać, gdy wstawisz reklamę!");
      } else if (message.content.toLowerCase().includes('wstawi' || 'juz' || 'gotowe')) {
        const guild = client.guilds.cache.get('1316466087570706432');
        if (!guild) {
          await message.channel.send("❕ Nie znaleziono serwera.");
          return;
        }

        const member = await guild.members.fetch(message.author.id).catch(() => null);
        if (!member) {
          await message.channel.send("❕ Dołącz na serwer, aby kontynuować!");
          return;
        }

        const channel = guild.channels.cache.find(ch => ch.name === '🤝partnerstwa' && ch.isText());
        if (!channel) {
          await message.channel.send("Nie znaleziono kanału '🤝partnerstwa'.");
          return;
        }

        await channel.send(userAd);
        await message.channel.send("✅ Dziękujemy za partnerstwo!");
        partneringUsers.delete(message.author.id);
      }
    }
  }
});

// Obsługa błędów
client.on('error', (error) => {
  console.error('Błąd Discorda:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Nieobsłużony błąd:', error);
});

// Logowanie do Discorda
client.login(process.env.DISCORD_TOKEN);
