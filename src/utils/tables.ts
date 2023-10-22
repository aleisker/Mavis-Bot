type TinyInt = 1 | 0 | boolean;

export default interface Tables {
  Servers: {
    serverId: string;
  };
  Modules: {
    serverId: string;
    moduleAr: TinyInt;
    moduleMo: TinyInt;
    moduleLv: TinyInt;
    moduleEc: TinyInt;
    moduleTk: TinyInt;
    moduleWc: TinyInt;
  };
  Channels: {
    serverId: string;
    welcome_channel: string;
    goodbye_channel: string;
    rankups_channel: string;
    skipped_channel_1: string;
    skipped_channel_2: string;
    skipped_channel_3: string;
  };
  AntiRaid: {
    serverId: string;
    join_times: number;
    join_timeout: number;
  };
  Users: {
    memberId: string;
    serverId: string;
    description: string;
    join_counter: number;
  };
  Economy: {
    memberId: string;
    money: number;
    bank: number;
    casino: number;
  };
  Leveling: {
    memberId: string;
    level: number;
    booster: string;
    xp_farmed: number;
    xp_needed: number;
  };
  Moderation: {
    memberId: string;
    serverId: string;
  };
  Bans: {
    memberId: string;
    date: string;
    reason: string;
    moderator: string;
  };
  Kick: {
    memberId: string;
    date: string;
    reason: string;
    moderator: string;
  };
  Mute: {
    memberId: string;
    date: string;
    reason: string;
    moderator: string;
  };
  Warn: {
    memberId: string;
    date: string;
    reason: string;
    moderator: string;
  };
}
