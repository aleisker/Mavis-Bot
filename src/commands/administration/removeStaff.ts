import {
	EmbedBuilder,
	PermissionsBitField,
	SlashCommandBuilder,
} from 'discord.js';
import { Command } from '../../interfaces/command';
import { deleteStaff } from '../../cluster/StaffManager';

const removeStaff: Command = {
	data: new SlashCommandBuilder()
		.setName('remove_staff')
		.setDescription('Retire un staff du moniteur.')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
		.addUserOption((option) =>
			option
				.setName('staff')
				.setRequired(true)
				.setDescription('Entrez la mention du staff à retirer.')
		),

	async executeCommand(client, interaction) {
		let staff = interaction.options.getUser('staff')!;

		try {
			await deleteStaff(staff);

			let success_embed = new EmbedBuilder()
				.setColor(client.getConfig().embed.readyColor)
				.setTitle('Staff retiré de la base de données !')
				.setDescription(`Utilisateur retiré: <@${staff.id}>`)
				.setTimestamp()
				.setFooter({
					iconURL: client.user?.avatarURL()!,
					text: client.getConfig().embed.footer,
				});
			interaction
				.reply({ embeds: [success_embed], ephemeral: false })
				.catch(console.error);
		} catch (error) {
			interaction
				.reply({
					content: `Erreur de resolveur SQL\n${error}`,
					ephemeral: false,
				})
				.catch(console.error);
		}
	},

	settings: {
		enabled: true,
	},
};

export default removeStaff;
