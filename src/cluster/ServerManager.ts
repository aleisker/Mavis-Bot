import { Guild } from 'discord.js';
import fetcher from '../utils/database';

export async function insertGuild(guild?: Guild | null) {
	if (guild) {
		await fetcher('Modules').insert({ ServerId: guild.id });
		await fetcher('Channels').insert({ ServerId: guild.id });

		const members = await guild.members.fetch();
		guild.members.cache.clear();

		await Promise.all(
			members.map(async (member) => {
				await fetcher('Economy').insert({
					ServerId: guild.id,
					MemberId: member.user.id,
				});
				await fetcher('Leveling').insert({
					ServerId: guild.id,
					MemberId: member.user.id,
				});
				await fetcher('Moderation').insert({
					ServerId: guild.id,
					MemberId: member.user.id,
				});
			})
		);
	}
}

export function c(module: boolean | number): string {
	let result = '';
	switch (module) {
		case false || 0:
			result = '🔴';
			break;
		case true || 1:
			result = '🟢';
			break;
		default:
			result = '🟡';
			break;
	}
	return result;
}

export async function findModule(guild?: Guild | null) {
	if (guild) {
		const result = (await fetcher('Modules').where({ ServerId: guild.id })).at(
			0
		);
		return result;
	}
}

export async function findChannel(guild?: Guild | null) {
	if (guild) {
		const result = (await fetcher('Channels').where({ ServerId: guild.id })).at(
			0
		);
		return result;
	}
}
