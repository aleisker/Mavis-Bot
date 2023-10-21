import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { Command } from "../../interfaces/command";
import query from '../../utils/database';

const prepareDb: Command = {
    data: new SlashCommandBuilder()
        .setName('sql_setup')
        .setDescription("Installe l'intégralité des dépendances en Base de Données de votre serveur.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async executeCommand(client, interaction) {
        let message = await interaction.reply("Lancement du programme...");
        query("Servers").insert({ serverId: interaction.guild?.id });
        query("Modules").insert({ serverId: interaction.guild?.id });
        query("Channels").insert({ serverId: interaction.guild?.id });
        interaction.guild?.members.cache.forEach(member => {
            query("Users").insert({ serverId: interaction.guild?.id, memberId: member.user.id });
            query("Moderation").insert({ serverId: interaction.guild?.id, memberId: member.user.id });
            query("Economy").insert({ memberId: member.user.id });
            query("Leveling").insert({ memberId: member.user.id });
        })
        message.edit(`Programme de création de table terminée, 1 Serveur + ${interaction.guild?.memberCount} Users instanciés sur MySQL !`)
    },

    settings: {
        enabled: true,
    },
};

export default prepareDb;