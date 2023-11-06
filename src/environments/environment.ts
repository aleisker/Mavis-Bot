import { GatewayIntentBits, Partials } from 'discord.js';
import Config from '../interfaces/config';

const config: Config = {
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [
		Partials.Channel,
		Partials.GuildMember,
		Partials.Message,
		Partials.Reaction,
		Partials.ThreadMember,
		Partials.User,
	],
	guildId: '704412119847796856',

	embed: {
		footer: 'Copyright Moonspike | Mode: Prod | By Aleisker',
		classColor: '#ff33c1',
		errorColor: '#ff5733',
		alertColor: '#ffca33',
		readyColor: '#a8da68',
		notifColor: '#7bc6ee',
	},
};

export default config;
