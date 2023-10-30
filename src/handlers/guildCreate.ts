import { Application } from "../interfaces/application";
import { Handler } from "../interfaces/handler";
import { Guild } from "discord.js";
import insertGuild from "../cluster/insertGuild";

export const guildCreate: Handler = {
  async executeHandler(client: Application, guild: Guild) {
    try {
      await insertGuild(guild);
    } catch (error) {
      client.getLogger().send(`UnhandledRejection : ${error}`, "ERROR");
    }
  },

  settings: {
    enabled: true,
  },
};

export default guildCreate;
