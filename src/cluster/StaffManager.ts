import { User } from 'discord.js';
import query from '../utils/database';

export async function insertStaff(user?: User | null) {
	if (user && !user.bot) {
		await query('Staffs').insert({ StaffId: user.id });
	}
}

export async function deleteStaff(user?: User | null) {
	if (user && !user.bot) {
		await query('Staffs').where({ StaffId: user.id }).delete();
	}
}

export async function searchStaff(user?: User | null) {
	if (user) {
		let fetcher = (await query('Staffs').where({ StaffId: user.id })).at(0);
		return fetcher;
	}
}
