import { Message } from 'discord.js';
import tipsData from '../data/tips.json';

export default {
    name: 'tip',
    description: 'El Temach te da un tip de masculinidad 🍆 para hombres machos.',
    async execute(message: Message): Promise<void> {
        try {
            const tips = tipsData.tips;
            
            if (!tips || tips.length === 0) {
                await message.reply('⚠️ No hay tips disponibles');
                return; // <-- Añade return explícito
            }

            const randomIndex = Math.floor(Math.random() * tips.length);
            await message.reply(`💡 **Tip Aleatorio**:\n${tips[randomIndex]}`);
            
        } catch (error) {
            console.error('Error en !tip:', error);
            await message.reply('❌ Ocurrió un error al buscar tips');
        }
    }
};
