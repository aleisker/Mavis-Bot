import { Guild, User } from 'discord.js';
import fetcher from '../utils/database';

export async function findModeration(guild?: Guild | null, user?: User | null) {
	if (guild && user) {
		const result = (
			await fetcher('Moderation')
				.where({ ServerId: guild.id })
				.andWhere({ MemberId: user.id })
		).at(0);
		return result;
	}
}

export async function findEconomy(guild?: Guild | null, user?: User | null) {
	if (guild && user) {
		const result = (
			await fetcher('Economy')
				.where({ ServerId: guild.id })
				.andWhere({ MemberId: user.id })
		).at(0);
		return result;
	}
}

export async function findLeveling(guild?: Guild | null, user?: User | null) {
	if (guild && user) {
		const result = (
			await fetcher('Leveling')
				.where({ ServerId: guild.id })
				.andWhere({ MemberId: user.id })
		).at(0);
		return result;
	}
}
