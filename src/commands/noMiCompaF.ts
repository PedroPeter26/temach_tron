import { Message, AttachmentBuilder } from 'discord.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Configuración de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIDEO_PATH = path.join(__dirname, '../../public/assets/videos/no_mi_compa_Farid.mp4');

export default {
    name: 'nomicompaf',
    description: 'Envía el video de Farid gritando NOOOO MI COMPAAA NOOOO! 🗣️🔥❗ NOOO',
    async execute(message: Message) {
        try {
            // Crear attachment (el nombre que aparecerá en Discord)
            const videoAttachment = new AttachmentBuilder(VIDEO_PATH, { 
                name: 'Farid_Episodio_Epico.mp4'
            });

            // Responder con el video
            await message.reply({
                content: '¡DIABLOS COMPA! 🗣️🔥',
                files: [videoAttachment]
            });
            
        } catch (error) {
            console.error('Error enviando el video:', error);
            await message.reply('❌ Ocurrió un error al enviar el video');
        }
    }
};
