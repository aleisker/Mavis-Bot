import { Application } from "../interfaces/application";
import { Handler } from "../interfaces/handler";
import { Guild } from "discord.js";
import insertGuild from "../utils/insertGuild";

export const guildCreate: Handler = {
  async executeHandler(client: Application, guild: Guild) {
    await insertGuild(guild);
  },

  settings: {
    enabled: true,
  },
};

export default guildCreate;
