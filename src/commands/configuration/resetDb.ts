import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { insertGuild } from '../../cluster/ServerManager';
import { Command } from '../../interfaces/command';

const prepareDb: Command = {
	data: new SlashCommandBuilder()
		.setName('reset_db')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
		.setDMPermission(false)
		.setDescription(
			"Permet de réinitialiser l`'entièreté de la base de données si cette dernière à échouée."
		),

	async executeCommand(client, interaction) {
		await interaction
			.reply({
				content: "🟠 | Lancement de l'algorithme de création des tables...",
				ephemeral: false,
			})
			.catch(console.error);
		try {
			await insertGuild(interaction.guild);
			await interaction.editReply({
				content: `🟢 | L'algorithme à réussi ! : 1 serveur + ${interaction.guild?.memberCount} membres ajoutés dans MySQL`,
			});
		} catch (error) {
			await interaction.editReply({
				content: `🔴 | L'algorithme à échoué : \`\`${error}\`\`; \nCeci est causé parce que la base de données est déjà installée`,
			});
		}
	},

	settings: {
		enabled: true,
	},
};

export default prepareDb;
