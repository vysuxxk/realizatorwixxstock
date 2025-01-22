import os
from discord import Client, Intents
from flask import Flask
from threading import Thread

app = Flask(__name__)

from discord import Client

client = Client(check_update=False)

@client.event
async def on_ready():
    print("Client is ready")



@app.route('/')
def home():
    return "Hello, I am alive!"

def run():
    app.run(host='0.0.0.0', port=8080)

def keep_alive():
    t = Thread(target=run)
    t.start()

intents = Intents.default()
intents.guilds = True
intents.guild_messages = True
intents.guild_members = True
bot = Client(intents=intents)

server_ad = """
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
"""

partnering_users = {}

@client.event
async def on_ready():
    print(f'Bot {bot.user} jest gotowy.')

@client.event
async def on_message(message):
    if message.author.id == client.user.id:
        return

    if "partner" in message.content.lower() and message.author.id not in partnering_users:
        partnering_users[message.author.id] = None
        await message.channel.send("🌎 Witaj! Jeśli chcesz nawiązać partnerstwo, wyślij proszę swoją reklame (maksymalnie 1 serwer).")
    elif message.author.id in partnering_users:
        if partnering_users[message.author.id] is None:
            partnering_users[message.author.id] = message.content  # Store user's ad content
            await message.channel.send(f"✅ Świetnie! Teraz wstaw naszą reklamę:\n{server_ad}")
            await message.channel.send("⏰ Daj znać gdy wstawisz reklamę, a wtedy my wstawimy twoją!")
        elif "wstawi" in message.content.lower():
            guild = client.get_guild(1316466087570706432)
            if guild and message.author.id not in [member.id for member in guild.members]:
                await message.channel.send("❕ Zanim kontynuujemy, musisz dołączyć na serwer!")
            else:
                channel = discord.utils.get(guild.channels, name="🤝partnerstwa")  # Partnerstwa channel name
                if channel:
                    user_ad = partnering_users[message.author.id]
                    await channel.send(user_ad)  # Post user's ad in the partnership channel
                    await message.channel.send("✅ Dziękujemy za nawiązanie partnerstwa!")
                    del partnering_users[message.author.id]  # Remove user from partnership list after process completion

keep_alive()

try:
    token = os.getenv('DISCORD_TOKEN')
    client.run(token)
except Exception as e:
    print(f'Error: {e}')
    raise e

