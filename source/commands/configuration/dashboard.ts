import { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
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
		if(!applicationDbInstance) {
			client.getLogger().send(`Tentative de création de la base de données d'application N°DBAPP_NO:${client.user?.id}...`, "ALERT");
			await client.getDatabase().createApplicationDatabase(client.user!.id);
		} else {
			let dashboardEmbedBuilder = new EmbedBuilder()
				.setAuthor({ iconURL: client.user?.avatarURL()!, name: "Obelysk Raid Program"})
				.setTitle("Configuration de l'attaque")
				.setDescription("**Commandes utiles :** \n/delete-roles <true | false> : Active|Désactive la suppréssion des Rôles.\n/delete-users <true | false> : Active|Désactive la suppréssion des Users.\n/delete-channels <true | false> : Active|Désactive la suppréssion des Channels.")
				.addFields([
					{ name: "Serveur à attaquer", value: applicationDbInstance.serverTargetId, inline: false },
					{ name: "Supprimer les Rôles ?", value: `Choix : ${applicationDbInstance.deleteRoles}`, inline: false },
					{ name: "Supprimer les Users ?", value: `Choix : ${applicationDbInstance.deleteUsers}`, inline: false },
					{ name: "Supprimer les Channels ?", value: `Choix : ${applicationDbInstance.deleteChannels}`, inline: false },
				])
				.setColor(client.getConfig().embed.classColor)
				.setFooter({ text: client.getConfig().embed.footer, iconURL: interaction.user.avatarURL()! })
			interaction.reply({ embeds: [ dashboardEmbedBuilder], ephemeral: false }).catch(e => client.getLogger().send(`Erreur : ${e}`, "ERROR"));
		}
	},

	settings: {
		enabled: true,
	},
};

export default dashboard;