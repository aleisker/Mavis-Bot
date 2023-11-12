import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ComponentType,
	EmbedBuilder,
	PermissionsBitField,
	SlashCommandBuilder,
} from 'discord.js';
import { c, findChannel, findModule } from '../../cluster/ServerManager';
import { Command } from '../../interfaces/command';

const dashboard: Command = {
	data: new SlashCommandBuilder()
		.setName('dashboard')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
		.setDMPermission(false)
		.setDescription(
			'Permet d\'afficher le tableau de configuration du serveur.'
		),

	async executeCommand(client, interaction) {
		const modules = await findModule(interaction.guild);
		const channels = await findChannel(interaction.guild);

		if (modules && channels) {
			const dashboard_embed = new EmbedBuilder()
				.setColor(client.getConfig().embed.classColor)
				.setAuthor({
					// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
					iconURL: client.user?.avatarURL()!,
					name: 'Gestionnaire de serveur ',
				})
				.setTitle('Tableau de bord général')
				.addFields([
					{
						name: 'Modules :',
						value:
							c(modules.ModuleMo) +
							' Modération\n' +
							c(modules.ModuleLv) +
							' Niveaux\n' +
							c(modules.ModuleEc) +
							' Economie\n' +
							c(modules.ModuleTk) +
							' Tickets\n' +
							c(modules.ModuleWc) +
							' Accueil',
						inline: false,
					},
					{
						name: 'Salon d\'envoi de contenu',
						value:
							'__Salon Welcome__ : <#' +
							channels.WelcomeChannel +
							'>\n__Salon Goodbye__ : <#' +
							channels.GoodbyeChannel +
							'>\n__Salon Rankups__ : <#' +
							channels.RankupsChannel +
							'>',
						inline: false,
					},
					{
						name: 'Salon ignorés par les niveaux',
						value:
							'__Salon 1__ : <#' +
							channels.SkippedChannel1 +
							'>\n__Salon 2__ : <#' +
							channels.SkippedChannel2 +
							'>\n__Salon 3__ : <#' +
							channels.SkippedChannel3 +
							'>',
						inline: false,
					},
				])
				.setTimestamp()
				.setFooter({
					iconURL: interaction.user.avatarURL()!,
					text: client.getConfig().embed.footer,
				});

			const rows = new ActionRowBuilder<ButtonBuilder>({
				components: [
					{
						custom_id: 'commands',
						disabled: true,
						label: 'Commandes',
						style: ButtonStyle.Primary,
						type: ComponentType.Button,
					},
					{
						custom_id: 'contact',
						disabled: true,
						label: 'Contacter un Développeur',
						style: ButtonStyle.Danger,
						type: ComponentType.Button,
					},
				],
			});

			interaction
				.reply({
					embeds: [dashboard_embed],
					components: [rows],
					ephemeral: false,
				})
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

export default dashboard;
