import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { Command } from "../../interfaces/command";

const prepareDb: Command = {
    data: new SlashCommandBuilder()
        .setName('sql_setup')
        .setDescription("Installe l'intégralité des dépendances en Base de Données de votre serveur.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async executeCommand(client, interaction) {
        let message = await interaction.reply("Lancement du programme...");
        client.getDatabase().insertGuild(interaction.guild!.id);
        client.getDatabase().insertModules(interaction.guild!.id);
        client.getDatabase().insertChannels(interaction.guild!.id);
        interaction.guild?.members.cache.forEach(member => {
            client.getDatabase().insertUser(interaction.guild!.id, member.user.id);
            client.getDatabase().insertModeration(interaction.guild!.id, member.user.id)
            client.getDatabase().insertEconomy(member.user.id)
        })
        message.edit(`Programme de création de table terminée, 1 Serveur + ${interaction.guild?.memberCount} Users instanciés sur MySQL !`)
    },

    settings: {
        enabled: true,
    },
};

export default prepareDb;