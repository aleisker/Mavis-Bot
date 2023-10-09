import { Application } from "../interfaces/application";
import { Handler } from "../interfaces/handler";

export const ready: Handler = {
	async executeHandler(client: Application) {
		client.getLogger().send(`Le client est maintenant connecté en tant que : ${client.user?.tag}`, 'READY');
	},

	settings: {
		enabled: true,
	},
};

export default ready;