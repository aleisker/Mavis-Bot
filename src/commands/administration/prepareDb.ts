import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { Command } from "../../interfaces/command";
import insertGuild from "../../utils/insertGuild";

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

    await insertGuild(interaction.guild);

    return message.edit(
      `Programme de création de table terminée, 1 Serveur + ${interaction.guild?.memberCount} Users instanciés sur MySQL !`,
    );
  },

  settings: {
    enabled: true,
  },
};

export default prepareDb;
