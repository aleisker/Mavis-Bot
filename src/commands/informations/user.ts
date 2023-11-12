import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interfaces/command';
import {
	findEconomy,
	findLeveling,
	findModeration,
} from '../../cluster/UserManager';
import day from 'dayjs';
import ms from 'ms';

const user: Command = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDMPermission(false)
		.setDescription(
			"Permet d'afficher la carte d'identité relative à ce serveur du membre mentionné."
		)
		.addUserOption((member) =>
			member
				.setName('member')
				.setRequired(true)
				.setDescription("Entrez la mention de l'utilisateur à consulter")
		),

	async executeCommand(client, interaction) {
		let member = interaction.options.getUser('member');

		if (member) {
			let moderation = await findModeration(
				interaction.guild,
				member
			);
			let leveling = await findLeveling(interaction.guild, member);
			let economy = await findEconomy(interaction.guild, member);

			if (moderation && leveling && economy) {
				let me_embed = new EmbedBuilder()
					.setColor(client.getConfig().embed.classColor)
					.setThumbnail(member.avatarURL())
					.setAuthor({
						iconURL: client.user?.avatarURL()!,
						name: 'Gestion des utilisateurs',
					})
					.setTitle(
						`Informations de ${member.displayName} (@${member.username}) :`
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
						{
							name: '💳 Banque :',
							value: `${economy.UsrBank} $`,
							inline: true,
						},
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
							value: member.bot.toString(),
							inline: false,
						},
						{
							name: "⏰ Compte crée il y'a :",
							value: `\`\`${ms(
								day().diff(member.createdAt)
							)}\`\` (le ${day(member.createdAt).format(
								'DD/MM/YYYY'
							)})`,
							inline: false,
						},
					])
					.setTimestamp()
					.setFooter({
						iconURL: member.avatarURL()!,
						text: client.getConfig().embed.footer,
					});
				interaction
					.reply({ embeds: [me_embed], ephemeral: false })
					.catch(console.error);
			} else {
				interaction.reply({
					content:
						"❌ | Une erreur d'accès à la base de données c'est produite, il serait judicieux de contacter un développeur.",
				});
			}
		}
	},

	settings: {
		enabled: true,
	},
};

export default user;
