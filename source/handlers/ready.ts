import { Application } from "../interfaces/application";
import { Handler } from "../interfaces/handler";

export const ready: Handler = {
	async executeHandler(client: Application) {
		client.getLogger().send(`Programme de lancement terminé, le client est maintenant connecté en tant que : ${client.user?.tag}`, 'READY');
	},

	settings: {
		enabled: true,
	},
};

export default ready;