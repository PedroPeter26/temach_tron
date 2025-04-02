import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Fix para __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

async function loadEvents() {
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const event = await import(`./events/${file}`);
    if (event.default.once) {
      client.once(event.default.name, (...args) => event.default.execute(...args));
    } else {
      client.on(event.default.name, (...args) => event.default.execute(...args));
    }
  }
}

// Validación del token
if (!process.env.DISCORD_TOKEN) {
  throw new Error('🔴 Falta el token en .env');
}

loadEvents().then(() => {
  client.login(process.env.DISCORD_TOKEN);
});
