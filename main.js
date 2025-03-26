const { Client, Intents } = require('discord.js-selfbot-v13');
const { MessageEmbed } = require('discord.js-selfbot-v13');
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
# 🚀 Witaj w Coding Zone! 🚀
**🔥 Czy jesteś gotowy, by dołączyć do najgorętszej społeczności programistów na Discordzie? 🔥**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⟨👨‍💻⟩ **Coding Zone** to miejsce, gdzie pasjonaci kodowania spotykają się, by:
  
>      ⟨💡⟩ **Dzielić się swoimi projektami** i osiągnięciami,
>  ⟨🤝⟩ **Pomagać sobie nawzajem** w rozwiązywaniu problemów,
>  ⟨🎉⟩ **Relaksować się** na kanałach for fun – nawet najlepszy kod czasem potrzebuje przerwy!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⟨💬⟩ **Masz pytanie?** Nasi eksperci są zawsze gotowi, by pomóc!
⟨🎮⟩ **Chcesz odpocząć?** Zagraj z nami w gry, porozmawiaj na luźne tematy lub po prostu zrelaksuj się w towarzystwie ludzi, którzy rozumieją Twoją pasję.

────────────────────────────────────────────────────────────────────────────────────

# 🌟 DLACZEGO CODING ZONE? 🌟

>      ⟨✅⟩ **Aktywna społeczność** – zawsze ktoś jest online!
>      ⟨✅⟩ **Kanały tematyczne** – od ⟨🐍⟩ Python po ⟨🟨⟩ JavaScript, od ⟨🤖⟩ AI po ⟨🌐⟩ web dev!
>      ⟨✅⟩ **Kanały rozrywkowe** – ⟨📸⟩ memy, ⟨🎲⟩ gry, ⟨🎵⟩ muzyka i wiele więcej!
>      ⟨✅⟩ **Wydarzenia i konkursy** – bo kodowanie to nie tylko praca, ale też zabawa!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 🔗 DOŁĄCZ JUŻ TERAZ! 🔗
👉 [KLIKNIJ TUTAJ, BY DOŁĄCZYĆ!](https://discord.gg/erDFWnB5pB) 👈
Gif: https://cdn.discordapp.com/attachments/1348199237673947167/1349117172340756530/coding_zone_gif.gif?ex=67d1eec7&is=67d09d47&hm=5c2adf45485c262dd70cfa09b2f4b6e8171b97791adb52c24e4defe9ccb8792c&

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**🎉 CZEKAMY WŁAŚNIE NA CIEBIE! 🎉**
# 🔥 Let’s code, share, and have fun together! 🔥
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
      await channel.send('# PARTNERSTWA PV');
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId_partnerstwa}`);
    }
  }, 6 * 60 * 1000); // 6 minut w milisekundach

  // reklamowanie serwera
  const channelId_programming = '1346609292425429194';
  const channelId_global = '1348329636056268911';
  const zimoweall = '1346609268375158834';
  const zimowethematic = '1346609283932094529';
  const zimowetech = '1346609290332602420';
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

client.on('guildMemberAdd', (member) => {
    // Znajdź kanał powitalny
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === "〈🛬〉᲼przyloty");
    if (welcomeChannel) {
        // Tworzenie embeda
        const embed = new MessageEmbed()
            .setColor('#00FF00') // Kolor paska bocznego
            .setTitle('Witamy na serwerze! 🎉') // Tytuł wiadomości
            .setDescription(`Cześć, ${member.user.username}! Jesteś naszym ${member.guild.memberCount}-tym członkiem.`) // Treść wiadomości
            .setThumbnail(member.user.displayAvatarURL()) // Miniaturka z awatarem użytkownika
            .setFooter({
                text: 'Miłego dnia!', 
                iconURL: client.user.displayAvatarURL() // Opcjonalna ikona w stopce
            })
            .setTimestamp(); // Dodanie czasu

        // Wysłanie wiadomości powitalnej z embedem
        welcomeChannel.send({ embeds: [embed] })
            .then(() => console.log('Embed powitalny wysłany!'))
            .catch(err => console.error('Błąd przy wysyłaniu wiadomości:', err));
    } else {
        console.error('Nie znaleziono kanału powitalnego!');
    }
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
          await message.channel.send("Mój właściciel @bRtech za niedługo na pewno dołączy do twojego serwera");
          const notificationUser = await client.users.fetch('782647700403257375');
          await notificationUser.send(`Wymagane dołączenie na serwer:\n${userAd}`);
        }

        const guild = client.guilds.cache.get('1348273862365941780');
        if (!guild) {
          await message.channel.send("❕ Nie znaleziono serwera.");
          return;
        }

        const member = await guild.members.fetch(message.author.id).catch(() => null);
        if (!member) {
          await message.channel.send("❕ Dołącz na serwer, aby kontynuować!");
          return;
        }

        const channel = guild.channels.cache.find(ch => ch.name === '⟨💼⟩᲼partnerstwa' && ch.isText());
        if (!channel) {
          await message.channel.send("Nie znaleziono kanału '⟨💼⟩᲼partnerstwa'.");
          return;
        }

        const displayName = member ? member.displayName : message.author.username;
        await channel.send(`${userAd}\n\nPartnerstwo z: ${member}`);
        await message.channel.send("✅ Dziękujemy za partnerstwo! W razie jakichkolwiek pytań prosimy o kontakt z użytkownikiem .b_r_tech. (bRtech)");

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
    const channel = member.guild.channels.cache.find(ch => ch.name === '⟨💼⟩᲼partnerstwa' && ch.isText());
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
