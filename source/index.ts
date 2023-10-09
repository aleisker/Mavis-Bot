import { config as envConfig } from 'dotenv';
import { Application } from './interfaces/application';
import chalk from 'chalk';

envConfig();
const client = new Application();

async function launchingDevice(): Promise<void> {

	console.log(chalk.bold.magenta(client.getLogger().ascii));

    await client.loadDatabase();
	await client.loadHandlers();
	await client.loadCommands();

	if (process.env.CACHE === 'clear') {
		console.log('Resetting cache');
		await client.breakSync();
	}

	await client.syncInts({ commands: true });
	await client.login(process.env.CLIENT_TOKEN);
}

launchingDevice();
