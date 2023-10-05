import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interfaces/command';

const dashboard: Command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong!'),

	async executeCommand(client, interaction) {
		await interaction.reply('Pong!');
	},

	settings: {
		enabled: true,
	},
};

export default dashboard;