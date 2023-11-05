import {
	EmbedBuilder,
	PermissionsBitField,
	SlashCommandBuilder,
} from 'discord.js';
import { Command } from '../../interfaces/command';
import { searchStaff } from '../../cluster/StaffManager';

const staffProfile: Command = {
	data: new SlashCommandBuilder()
		.setName('staff_profile')
		.setDescription('Montre les informations du staff mentionné.')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
		.addUserOption((option) =>
			option
				.setName('staff')
				.setRequired(true)
				.setDescription('Entrez la mention du staff à visualiser.')
		),

	async executeCommand(client, interaction) {
		let staff = interaction.options.getUser('staff')!;
		let pinged = await searchStaff(staff);
		if (pinged) {
			try {
				let success_embed = new EmbedBuilder()
					.setColor(client.getConfig().embed.classColor)
					.setTitle(
						`Informations de ${staff.displayName} ( ${staff.username} )`
					)
					.setThumbnail(staff.avatarURL())
					.addFields([
						{
							name: '📫 Points Support',
							value:
								'> ' +
								pinged.SPPoints.toString() +
								'/' +
								pinged.SPRequired.toString() +
								` Point(s)\n> **(🧪 Level ${pinged.SPLevel.toString()})**`,
							inline: false,
						},
						{
							name: '⚖️ Points Modération',
							value:
								'> ' +
								pinged.MOPoints.toString() +
								'/' +
								pinged.MORequired.toString() +
								` Point(s)\n> **(🧪 Level ${pinged.MOLevel.toString()})**`,
							inline: false,
						},
						{
							name: '🔑 Points Antiraid',
							value:
								'> ' +
								pinged.ARPoints.toString() +
								'/' +
								pinged.ARRequired.toString() +
								` Point(s)\n> **(🧪 Level ${pinged.ARLevel.toString()})**`,
							inline: false,
						},
						{
							name: '📗 Pouces verts',
							value:
								'> ' +
								pinged.TUAmount.toString() +
								'/' +
								pinged.TURequired.toString() +
								` Pouce(s)\n> **(❤️ Level ${pinged.TULevel.toString()})**`,
							inline: false,
						},
						{
							name: '📕 Pouces rouges',
							value: '> ' + pinged.TDAmount.toString() + ' Pouce(s)',
							inline: false,
						},
						{
							name: '📚 Tickets Claims',
							value: '> ' + pinged.TKClaimed.toString() + ' Ticket(s)',
							inline: false,
						},
					])
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
		} else {
			interaction
				.reply({
					content: "Aucun staff ajouté avec ce nom d'utilisateur !",
					ephemeral: false,
				})
				.catch(console.error);
		}
	},

	settings: {
		enabled: true,
	},
};

export default staffProfile;
