import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { findModule } from '../../cluster/ServerManager';
import { Command } from '../../interfaces/command';
import fetcher from '../../utils/database';

const setModule: Command = {
	data: new SlashCommandBuilder()
		.setName('set_module')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
		.setDMPermission(false)
		.setDescription("Permet d'activer / désactiver les différents modules.")
		.addStringOption((modules) =>
			modules
				.setName('module')
				.setRequired(true)
				.setDescription('Entrez le nom du module à activer / désactiver')
		),

	async executeCommand(client, interaction) {
		const module = interaction.options.getString('module');
		const searcher = await findModule(interaction.guild);

		if (module && searcher) {
			switch (module) {
				case 'Moderation':
					if (searcher.ModuleMo == false) {
						await fetcher('Modules')
							.update({ ModuleMo: true })
							.where({ ServerId: interaction.guild?.id });
					} else {
						await fetcher('Modules')
							.update({ ModuleMo: false })
							.where({ ServerId: interaction.guild?.id });
					}
					interaction
						.reply({ content: 'Module mis à jour !', ephemeral: false })
						.catch(console.error);
					break;
				case 'Leveling':
					if (searcher.ModuleLv == false) {
						await fetcher('Modules')
							.update({ ModuleLv: true })
							.where({ ServerId: interaction.guild?.id });
					} else {
						await fetcher('Modules')
							.update({ ModuleLv: true })
							.where({ ServerId: interaction.guild?.id });
					}
					interaction
						.reply({ content: 'Module mis à jour !', ephemeral: false })
						.catch(console.error);
					break;
				case 'Economie':
					if (searcher.ModuleEc == false) {
						await fetcher('Modules')
							.update({ ModuleEc: true })
							.where({ ServerId: interaction.guild?.id });
					} else {
						await fetcher('Modules')
							.update({ ModuleEc: true })
							.where({ ServerId: interaction.guild?.id });
					}
					interaction
						.reply({ content: 'Module mis à jour !', ephemeral: false })
						.catch(console.error);
					break;
				case 'Tickets':
					if (searcher.ModuleTk == false) {
						await fetcher('Modules')
							.update({ ModuleTk: true })
							.where({ ServerId: interaction.guild?.id });
					} else {
						await fetcher('Modules')
							.update({ ModuleTk: true })
							.where({ ServerId: interaction.guild?.id });
					}
					interaction
						.reply({ content: 'Module mis à jour !', ephemeral: false })
						.catch(console.error);
					break;
				case 'Welcomming':
					if (searcher.ModuleWc == false) {
						await fetcher('Modules')
							.update({ ModuleWc: true })
							.where({ ServerId: interaction.guild?.id });
					} else {
						await fetcher('Modules')
							.update({ ModuleWc: true })
							.where({ ServerId: interaction.guild?.id });
					}
					interaction
						.reply({ content: 'Module mis à jour !', ephemeral: false })
						.catch(console.error);
					break;
			}
		} else {
			interaction.reply({ content: '❌ | Une erreur d\'accès à la base de données c\'est produite, il serait judicieux de contacter un développeur.' });
		}
	},

	settings: {
		enabled: true,
	},
};

export default setModule;
