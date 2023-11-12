import { Client, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

import Config from './config';
import Logger from '../utils/logger';
import configFile from '../environments/environment';
import { Command } from './command';

export class Application extends Client {
	private config: Config = configFile;
	private logger: Logger = new Logger();
	private commands: Command[] = [];

	constructor() {
		super({
			intents: configFile.intents,
			partials: configFile.partials,
			allowedMentions: { parse: ['roles', 'users'], repliedUser: false },
		});
	}

	public getConfig(): Config {
		return this.config;
	}

	public getLogger(): Logger {
		return this.logger;
	}

	public getCommands(): Command[] {
		return this.commands;
	}

	public async loadHandlers() {
		const files = readdirSync(join(__dirname, '..', 'handlers'));
		for (const file of files) {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const handler = require(join(__dirname, '..', 'handlers', file));
			if (handler.default.settings.enabled) {
				const handlerName = file.split('.')[0];
				this.on(handlerName, (...args) =>
					handler.default.executeHandler(this, ...args)
				);
				this.getLogger().send(`Handler Chargé: ${handlerName}`, 'NOTIF');
			}
		}
		this.getLogger().send(
			`Méthode loadHandlers terminée : ${files.length} handlers chargés`,
			'READY'
		);
	}

	public async loadCommands() {
		const subfolders = readdirSync(join(__dirname, '..', 'commands'));
		for (const folder of subfolders) {
			const files = readdirSync(join(__dirname, '..', 'commands', folder));
			for (const file of files) {
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const command = require(
					join(__dirname, '..', 'commands', folder, file)
				);
				const commandName = file.split('.')[0];
				if (command.default.settings.enabled) {
					this.commands.push(command.default);
					this.getLogger().send(`Commande Chargée: ${commandName}`, 'NOTIF');
				}
			}
		}
		this.getLogger().send(
			`Méthode loadCommands terminée : ${this.commands.length} commandes chargées`,
			'READY'
		);
	}

	private async getSyncInts(syncInts: SyncInts): Promise<unknown[]> {
		const data = [];
		if (syncInts.commands) {
			if (this.commands.length === 0) {
				this.getLogger().send(
					'Aucune commande slashée à mettre en cache pour synchronisation',
					'ERROR'
				);
			} else {
				this.getLogger().send(
					`Synchronisation de ${this.commands.length} commandes slashées`,
					'READY'
				);
				data.push(...this.commands.map((cmd) => cmd.data.toJSON()));
			}
		}
		return data;
	}

	public async syncInts(syncInts: SyncInts): Promise<void> {
		const data = await this.getSyncInts(syncInts);
		if (data.length === 0)
			return this.getLogger().send(
				'Aucune commande slashée à syncroniser',
				'ERROR'
			);
		const rest = new REST({ version: '10' }).setToken(
			process.env.CLIENT_TOKEN!
		);
		try {
			rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
				body: data,
			});
		} catch (e) {
			this.getLogger().send(`${e}`, 'ERROR');
		}
	}

	public async breakSync() {
		await this.application?.commands.set([]);
		for (const guild of this.guilds.cache.values()) {
			await guild.commands.set([]);
		}
	}
}

interface SyncInts {
	commands?: boolean;
}
