const { Client, Intents } = require('discord.js-selfbot-v13');
const { MessageEmbed } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;
const Discord = require('discord.js-selfbot-v13');
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
# 🎉 Witamy na serwerze FSQQLI ST0CK! 🎉

Cieszymy się, że do nas dołączyłeś/aś! 💥
Tutaj znajdziesz wszystko, czego potrzebujesz w świecie cyfrowym — szybko, tanio i bezpiecznie.

🛒 Co u nas kupisz?
🎮 Konta do najpopularniejszych gier:
• Fortnite, Valorant, Supercell, Steam, Minecraft
🎧 Serwisy premium:
• Spotify, Netflix, Discord, Facebook i inne!
💸 Waluty do gier:
• Robuxy, V-Dolce i inne gamingowe skarby!

💬 Masz pytania? Napisz do administracji — jesteśmy tu, żeby pomóc!
📢 Obserwuj ogłoszenia, bierz udział w promocjach i nie przegap żadnej okazji!

🔐 Z nami zyskujesz jakość, zaufanie i najlepsze ceny na rynku!

Dołącz do naszej społeczności i rozkręć swój cyfrowy świat! 🚀

discord.gg/a77uMbSBmD

## RESTOCK WSZYSTKIEGO NA 20 OSÓB
`;

// Lista użytkowników partnerstwa i ich czas ostatniego partnerstwa
const partneringUsers = new Map();
const partnershipTimestamps = new Map();

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy.`);
  // Wysyłanie wiadomości co 6 minut
  const channelId_partnerstwa = '1346609247869337701';
  const serverId = '1348273862365941780';
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_partnerstwa);
    if (channel) {
      await channel.send('# PARTNERSTWA PV - Shop Discord');
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId_partnerstwa}`);
    }
  }, 5.5 * 60 * 1000); // 6 minut w milisekundach

  // reklamowanie serwera
  const channelId_programming = '1346609275761332325';
  const channelId_global = '1348329636056268911';
  const zimoweall = '1346609268375158834';
  const zimowethematic = '1346609280291442708';
  const zimowetech = '1346609282174685264';
  const zimowe6h = '1346609312042324060';
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_programming);
    const channel_global = client.channels.cache.get(channelId_global);
    const zimoweall1 = client.channels.cache.get(zimoweall);
    const zimowethematic1 = client.channels.cache.get(zimowethematic);
    const zimowetech1 = client.channels.cache.get(zimowetech);
    const zimowe6h1 = client.channels.cache.get(zimowe6h);
    if (channel) {
      await channel.send(serverAd);
      await channel_global.send(serverAd);
      await zimoweall1.send(serverAd);
      await zimowethematic1.send(serverAd);
      await zimowetech1.send(serverAd);
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId_programming}`);
    }
  }, 11 * 60 * 1000); // 11 minut w milisekundach
});




client.on('messageCreate', async (message) => {
  // Sprawdzenie, czy wiadomość pochodzi od innego użytkownika
  if (!message.guild && !message.author.bot && message.author.id !== client.user.id) {
    const now = Date.now();
    const lastPartnership = partnershipTimestamps.get(message.author.id);

    if (lastPartnership && now - lastPartnership < 7 * 24 * 60 * 60 * 1000) {
      // Jeśli użytkownik chce nawiązać partnerstwo wcześniej niż tydzień, wyślij wiadomość
      await message.channel.send("⏳ Musisz jeszcze poczekać, zanim będziesz mógł nawiązać kolejne partnerstwo. Spróbuj ponownie za tydzień.");
      return;
    }

    if (!partneringUsers.has(message.author.id)) {
      partneringUsers.set(message.author.id, null);
      await message.channel.send("🌎 Jeśli chcesz nawiązać partnerstwo, wyślij swoją reklamę (maksymalnie 1 serwer).");
    } else {
      const userAd = partneringUsers.get(message.author.id);

      if (userAd === null) {
        partneringUsers.set(message.author.id, message.content);
        await message.channel.send(`✅ Wstaw naszą reklamę:\n${serverAd}`);
        await message.channel.send("⏰ Daj znać, gdy wstawisz reklamę!");
      } else if (message.content.toLowerCase().includes('wstawi') || message.content.toLowerCase().includes('już') || message.content.toLowerCase().includes('gotowe') || message.content.toLowerCase().includes('juz')) {
        // Dodajemy pytanie o dołączenie na serwer
        await message.channel.send("Czy wymagane jest dołączenie na twój serwer?");
        const filter = m => m.author.id === message.author.id;
        const reply = await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] }).catch(() => null);

        if (reply && !reply.first().content.toLowerCase().includes('nie')) {
          await message.channel.send("Mój właściciel @xxvysuxx za niedługo na pewno dołączy do twojego serwera");
          const notificationUser = await client.users.fetch('855152045749174283');
          await notificationUser.send(`Wymagane dołączenie na serwer:\n${userAd}`);
        }

        const guild = client.guilds.cache.get('1382977764818419762');
        if (!guild) {
          await message.channel.send("❕ Nie znaleziono serwera.");
          return;
        }

        const member = await guild.members.fetch(message.author.id).catch(() => null);
        if (!member) {
          await message.channel.send("❕ Dołącz na serwer, aby kontynuować!");
          return;
        }

        const channel = guild.channels.cache.find(ch => ch.name === '「💼」współprace' && ch.isText());
        if (!channel) {
          await message.channel.send("Nie znaleziono kanału '「💼」współprace'.");
          return;
        }

        const displayName = member ? member.displayName : message.author.username;
        await channel.send(`${userAd}\n\nPartnerstwo z: ${member}`);
        await message.channel.send("✅ Dziękujemy za partnerstwo! W razie jakichkolwiek pytań prosimy o kontakt z użytkownikiem xxvysuxx");

        partnershipTimestamps.set(message.author.id, now);
        partneringUsers.delete(message.author.id);
      }
    }
  }
});

// Obsługa zdarzeń, kiedy użytkownik dołącza na serwer
client.on('guildMemberAdd', async (member) => {
  // Sprawdź, czy użytkownik znajduje się w mapie partneringUsers
  if (partneringUsers.has(member.id)) {
    // Wyślij wiadomość powitalną lub dalsze instrukcje do użytkownika
    const userAd = partneringUsers.get(member.id);
    const channel = member.guild.channels.cache.find(ch => ch.name === '「💼」współprace' && ch.isText());
    if (channel) {
      const displayName = member.displayName;
      await channel.send(`${userAd}\n\nPartnerstwo z: ${member}`);
      const dmChannel = await member.createDM();
      await dmChannel.send("✅ Dziękujemy za dołączenie! Twoja reklama została wstawiona.");
      // Usuń użytkownika z mapy partneringUsers
      partneringUsers.delete(member.id);
      // Zaktualizuj czas ostatniego partnerstwa
      const now = Date.now();
      partnershipTimestamps.set(member.id, now);
    } else {
      console.error("Nie znaleziono kanału '💼・partnerstwa'.");
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
