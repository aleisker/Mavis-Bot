import { User } from "discord.js";
import query from "../utils/database";

export async function insertStaff(user?: User | null) {
  if (user && !user.bot) {
    await query("Staffs").insert({ StaffId: user.id });
  }
}

export async function deleteStaff(user?: User | null) {
  if (user && !user.bot) {
    await query("Staffs").where({ StaffId: user.id }).delete();
  }
}
