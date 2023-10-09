import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import ApplicationManager from '../../cluster/applicationmanager';
import { Command } from '../../interfaces/command';

const dashboard: Command = {
	data: new SlashCommandBuilder()
		.setName('dashboard')
		.setDescription("Affiche les différentes modalités d'attaque activées de Obelysk")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
	async executeCommand(client, interaction) {
		let applicationDbInstance = await ApplicationManager.findOne({ applicationID: client.user?.id });
		if(!applicationDbInstance) { applicationDbInstance = await client.getDatabase().createApplicationDatabase(); }
	},

	settings: {
		enabled: true,
	},
};

export default dashboard;