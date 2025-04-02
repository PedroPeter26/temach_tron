import { Message } from 'discord.js';
import dichosData from '../data/dichos.json';

export default {
    name: 'dicho',
    description: 'Recibe un dicho de hombre para hombres, dado por el Temach MI COMPA 🗣️',
    async execute(message: Message): Promise<void> {
        try {
            const dicho = dichosData.dichos;
            
            if (!dicho || dicho.length === 0) {
                await message.reply('⚠️ No hay dichos disponibles');
                return;
            }

            const randomIndex = Math.floor(Math.random() * dicho.length);
            await message.reply(`💡 **Mi abuelo decía...**:\n${dicho[randomIndex]}`);
            
        } catch (error) {
            console.error('Error en !tip:', error);
            await message.reply('❌ Ocurrió un error al buscar dichos');
        }
    }
};
