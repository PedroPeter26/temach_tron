import { Events, Client, ActivityType } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log(`✅ Bot online como ${client.user?.tag}`);
    
    // Configuración del estado personalizado
    client.user?.setPresence({
      activities: [{
        name: '&help',
        type: ActivityType.Playing
      }],
      status: 'online'
    });
  }
};
