type TinyInt = 1 | 0 | boolean;

export default interface Tables {
  Server: {
    ServerId: string;
    ServerId_FK1: string;
    ServerId_FK2: string;
    ServerId_FK3: string;
  };
  Plugin: {
    ServerId: string;
    ModuleAr: TinyInt;
    ModuleMo: TinyInt;
    ModuleLv: TinyInt;
    ModuleEc: TinyInt;
    ModuleWc: TinyInt;
  };
  Channel: {
    ServerId: string;
    WelcomeChannel: string;
    GoodbyeChannel: string;
    RankupsChannel: string;
    SkippedChannel1: string;
    SkippedChannel2: string;
    SkippedChannel3: string;
  };
  AntiRaid: {
    ServerId: string;
    JoinLimit: number;
    JoinTimeout: number;
    JoinSanction: string;
  };
  Member: {
    MemberId: string;
    About: string;
    JoinCounter: number;
    MemberId_FK1: string;
    MemberId_FK2: string;
  };
  Economy: {
    MemberId: string;
    Wallet: number;
    Bank: number;
    Casino: number;
  };
  Leveling: {
    MemberId: string;
    Ladder: number;
    Booster: string;
    XpFarmed: number;
    XpNeeded: number;
  };
  Sanction: {
    MemberId: string;
    ServerId: string;
    ModId: string;
    Sanction: string;
    Reason: string;
  };
}
