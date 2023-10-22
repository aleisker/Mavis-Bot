import { Guild } from "discord.js";
import query from "./database";

export default async function insertGuild(guild?: Guild | null) {
  if (guild) {
    await query("Servers").insert({ serverId: guild.id });
    await query("Modules").insert({ serverId: guild.id });
    await query("Channels").insert({ serverId: guild.id });

    const members = await guild.members.fetch();

    guild.members.cache.clear();

    await Promise.all(
      members.map(async (member) => {
        await query("Users").insert({
          serverId: guild.id,
          memberId: member.user.id,
        });
        await query("Moderation").insert({
          serverId: guild.id,
          memberId: member.user.id,
        });
        await query("Economy").insert({ memberId: member.user.id });
        await query("Leveling").insert({ memberId: member.user.id });
      }),
    );
  }
}
