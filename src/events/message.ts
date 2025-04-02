import { Events, Message } from 'discord.js';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Fix para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carga dinámica de comandos
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = readdirSync(commandsPath)
  .filter(file => file.endsWith('.ts'));

const commands: Record<string, any> = {};

for (const file of commandFiles) {
  const command = await import(`../commands/${file}`);
  commands[command.default.name] = command.default;
}

export default {
  name: Events.MessageCreate,
  async execute(message: Message) {
    if (message.author.bot || !message.content.startsWith('&')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (commandName && commands[commandName]) {
      try {
        await commands[commandName].execute(message, args);
      } catch (error) {
        console.error('Error en comando:', commandName, error);
        if (message.deletable) await message.delete();
        await message.author.send(`❌ Error con el comando ${commandName}`).catch(console.error);
      }
    }
  }
};
