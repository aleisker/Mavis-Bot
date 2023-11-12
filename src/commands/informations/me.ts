import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interfaces/command';
import {
	findEconomy,
	findLeveling,
	findModeration,
} from '../../cluster/UserManager';
import day from 'dayjs';
import ms from 'ms';

const me: Command = {
	data: new SlashCommandBuilder()
		.setName('me')
		.setDMPermission(false)
		.setDescription(
			'Permet d\'afficher votre carte d\'identité relative à ce serveur.'
		),

	async executeCommand(client, interaction) {
		const moderation = await findModeration(interaction.guild, interaction.user);
		const leveling = await findLeveling(interaction.guild, interaction.user);
		const economy = await findEconomy(interaction.guild, interaction.user);

		if (moderation && leveling && economy) {
			const me_embed = new EmbedBuilder()
				.setColor(client.getConfig().embed.classColor)
				.setThumbnail(interaction.user.avatarURL())
				.setAuthor({
					// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
					iconURL: client.user?.avatarURL()!,
					name: 'Gestion des utilisateurs',
				})
				.setTitle(
					`Informations de ${interaction.user.displayName} (@${interaction.user.username}) :`
				)
				.addFields([
					{
						name: '🔮 Niveau :',
						value: `N° : ${leveling.UsrLevel}`,
						inline: true,
					},
					{
						name: '🧪 Booster :',
						value: `RANG ${leveling.UsrBooster}`,
						inline: true,
					},
					{
						name: '🧬 Expérience :',
						value: `${leveling.UsrXpFarmed} | ${leveling.UsrXpNeeded} XP`,
						inline: true,
					},
					{
						name: '💰 Monnaie :',
						value: `${economy.UsrMoney} $`,
						inline: true,
					},
					{ name: '💳 Banque :', value: `${economy.UsrBank} $`, inline: true },
					{
						name: '🧭 Points Casino :',
						value: `${economy.UsrCasino} Points`,
						inline: true,
					},
					{
						name: '💣 Sanctions :',
						value: `\`\`\`Bans: ${moderation.Bans}\nKick: ${moderation.Kick}\nMute: ${moderation.Mute}\nWarn: ${moderation.Warn}\`\`\``,
						inline: false,
					},
					{
						name: '📀 Est un bot Discord ?',
						value: interaction.user.bot.toString(),
						inline: false,
					},
					{
						name: '⏰ Compte crée il y\'a :',
						value: `\`\`${ms(
							day().diff(interaction.user.createdAt)
						)}\`\` (le ${day(interaction.user.createdAt).format(
							'DD/MM/YYYY'
						)})`,
						inline: false,
					},
				])
				.setTimestamp()
				.setFooter({
					iconURL: interaction.user.avatarURL()!,
					text: client.getConfig().embed.footer,
				});
			interaction
				.reply({ embeds: [me_embed], ephemeral: false })
				.catch(console.error);
		} else {
			interaction.reply({
				content:
					'❌ | Une erreur d\'accès à la base de données c\'est produite, il serait judicieux de contacter un développeur.',
			});
		}
	},

	settings: {
		enabled: true,
	},
};

export default me;
