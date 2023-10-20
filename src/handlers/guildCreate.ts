import { Application } from '../interfaces/application';
import { Handler } from '../interfaces/handler';
import { Interaction } from 'discord.js';

export const interactionCreate: Handler = {
	async executeHandler(client: Application, interaction: Interaction) {
        client.getDatabase().insertGuild(interaction.guild!.id);
        client.getDatabase().insertModules(interaction.guild!.id);
        client.getDatabase().insertChannels(interaction.guild!.id);
        interaction.guild?.members.cache.forEach(member => {
            client.getDatabase().insertUser(interaction.guild!.id, member.user.id);
            client.getDatabase().insertModeration(interaction.guild!.id, member.user.id);
            client.getDatabase().insertEconomy(member.user.id);
            client.getDatabase().insertLeveling(member.user.id); 
        })
    },

    settings: {
        enabled: true
    },
};