import { Guild } from "discord.js";
import query from "../utils/database";

export default async function insertGuild(guild?: Guild | null) {
  if (guild) {
    await query("AntiRaid").insert({ ServerId: guild.id });
    await query("Channel").insert({ ServerId: guild.id });
    await query("Plugin").insert({ ServerId: guild.id });
    await query("Server").insert({
      ServerId: guild.id,
      ServerId_FK1: guild.id,
      ServerId_FK2: guild.id,
      ServerId_FK3: guild.id,
    });

    const members = await guild.members.fetch();

    guild.members.cache.clear();

    await Promise.all(
      members.map(async (member) => {
        await query("Economy").insert({ MemberId: member.user.id });
        await query("Leveling").insert({ MemberId: member.user.id });
        await query("Member").insert({
          MemberId: member.user.id,
          MemberId_FK1: member.user.id,
          MemberId_FK2: member.user.id,
        });
      }),
    );
  }
}
