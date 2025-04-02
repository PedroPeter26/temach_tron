// commands/help.ts
import { Message } from 'discord.js';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  name: 'help',
  description: 'Muestra una lista de los comandos disponibles hasta el momento.',
  aliases: ['h'],
  async execute(message: Message) {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = readdirSync(commandsPath)
      .filter(file => file.endsWith('.ts') && !file.startsWith('_'));

    let helpText = '📚 **Comandos disponibles**:\n';
    
    for (const file of commandFiles) {
      const command = await import(`../commands/${file}`);
      helpText += `\n**&${command.default.name}**: ${command.default.description || 'Sin descripción'}`;
    }

    await message.reply(helpText);
  }
};
