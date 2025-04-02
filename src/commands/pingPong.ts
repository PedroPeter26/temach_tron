import { Message } from 'discord.js';

export default {
  name: 'ping',
  description: 'Responde con 🏓 Pong!',
  aliases: ['p'],
  async execute(message: Message) {
    const latency = Date.now() - message.createdTimestamp;
    await message.reply(`🏓 Pong! (Latencia: ${latency}ms)`);
  }
};
