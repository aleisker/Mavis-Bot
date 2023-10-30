import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { Command } from "../../interfaces/command";
import insertGuild from "../../cluster/insertGuild";

const prepareDb: Command = {
  data: new SlashCommandBuilder()
    .setName("sql_setup")
    .setDescription(
      "Installe l'intégralité des dépendances en Base de Données de votre serveur.",
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async executeCommand(client, interaction) {
    let message = await interaction.reply("Lancement du programme...");
    try {
      await insertGuild(interaction.guild);
      return message.edit(
        `Programme de création de table terminée, 1 Serveur + ${interaction.guild?.memberCount} Users instanciés sur MySQL !`,
      );
    } catch (error) {
      return message.edit(
        `Programme de création de table échouée, \n\`\`\`${error}\`\`\``,
      );
    }
  },

  settings: {
    enabled: true,
  },
};

export default prepareDb;
