import { Application } from '../interfaces/application';
import { Handler } from '../interfaces/handler';
import { Interaction } from 'discord.js';
import query from '../utils/database';

export const guildCreate: Handler = {
	async executeHandler(client: Application, interaction: Interaction) {
        query("Servers").insert({ serverId: interaction.guild?.id });
        query("Modules").insert({ serverId: interaction.guild?.id });
        query("Channels").insert({ serverId: interaction.guild?.id });
        interaction.guild?.members.cache.forEach(member => {
            query("Users").insert({ serverId: interaction.guild?.id, memberId: member.user.id });
            query("Moderation").insert({ serverId: interaction.guild?.id, memberId: member.user.id });
            query("Economy").insert({ memberId: member.user.id });
            query("Leveling").insert({ memberId: member.user.id });
        })
    },

    settings: {
        enabled: true
    },
};

export default guildCreate;