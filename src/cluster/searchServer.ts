import { Guild } from "discord.js";
import query from "../utils/database";

export async function searchPlugin(guild?: Guild | null) {
  if (guild) {
    let fetcher = (await query("Plugin").where({ ServerId: guild.id })).at(0);
    return fetcher;
  }
}
