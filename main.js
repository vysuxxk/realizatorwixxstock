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
https://discord.gg/9ZbKzvS4QE
https://share.creavite.co/67646e7f0ae0e4f686a629f9.gif
https://share.creavite.co/67646f950ae0e4f686a62a01.gif
`;

// Lista użytkowników partnerstwa i ich czas ostatniego partnerstwa
const partneringUsers = new Map();
const partnershipTimestamps = new Map();

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy.`);
  // Wysyłanie wiadomości co 6 minut
  const channelId_partnerstwa = '1252280791946235915';
  const serverId = '1175916293816332318';
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_partnerstwa);
    if (channel) {
      await channel.send('# PARTNERSTWA PV');
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId_partnerstwa}`);
    }
  }, 6 * 60 * 1000); // 6 minut w milisekundach

  // reklamowanie serwera
  const channelId_programming = '1252290252328927353';
  const channelId_global = '1252285992396918835'
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_programming);
    const channel_global = client.channels.cache.get(channelId_global);
    if (channel) {
      await channel.send(serverAd);
      await channel_global.send(serverAd);
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
        await message.channel.send("❔ Czy wymagane jest dołączenie na serwer? Odpowiedz 'tak' lub 'nie'.");

        const filter = response => {
          return response.author.id === message.author.id && response.channel.id === message.channel.id;
        };

        const collected = await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
          .catch(() => null);

        if (collected) {
          const userResponse = collected.first().content.toLowerCase();
          if (!userResponse.includes('nie')) {
            const linkPattern = /(https:\/\/discord\.gg\/[^\s]+)/g;
            const link = userAd.match(linkPattern);

            if (link) {
              try {
                const response = await axios.get(link[0]);
                if (response.status === 200) {
                  await message.channel.send("✅ Bot dołączył do serwera!");
                } else {
                  await message.channel.send("❌ Nie udało się dołączyć do serwera.");
                }
              } catch (error) {
                await message.channel.send(`❌ Wystąpił błąd przy dołączaniu do serwera: ${error.message}`);
              }
            } else {
              await message.channel.send("❌ Nie znaleziono poprawnego linku do serwera.");
            }
          } else {
            await message.channel.send("🛑 Pominięto dołączanie do serwera.");
          }
        }
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
    const channel = member.guild.channels.cache.find(ch => ch.name === '💼・partnerstwa' && ch.isText());
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
