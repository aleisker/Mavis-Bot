DROP TABLE IF EXISTS `Servers`;
CREATE TABLE IF NOT EXISTS `Servers` (
    `serverId` VARCHAR(18) NOT NULL,

    UNIQUE INDEX `Servers_serverId_key`(`serverId`),
    PRIMARY KEY (`serverId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Modules`;
CREATE TABLE IF NOT EXISTS `Modules` (
    `serverId` VARCHAR(18) NOT NULL,
    `moduleAr` BOOLEAN NOT NULL DEFAULT false,
    `moduleMo` BOOLEAN NOT NULL DEFAULT false,
    `moduleLv` BOOLEAN NOT NULL DEFAULT false,
    `moduleEc` BOOLEAN NOT NULL DEFAULT false,
    `moduleTk` BOOLEAN NOT NULL DEFAULT false,
    `moduleWc` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Modules_serverId_key`(`serverId`),
    PRIMARY KEY (`serverId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Channels`;
CREATE TABLE IF NOT EXISTS `Channels` (
    `serverId` VARCHAR(18) NOT NULL,
    `welcome_channel` VARCHAR(18) NOT NULL DEFAULT 'Indéfini',
    `goodbye_channel` VARCHAR(18) NOT NULL DEFAULT 'Indéfini',
    `rankups_channel` VARCHAR(18) NOT NULL DEFAULT 'Indéfini',
    `skipped_channel_1` VARCHAR(18) NOT NULL DEFAULT 'Indéfini',
    `skipped_channel_2` VARCHAR(18) NOT NULL DEFAULT 'Indéfini',
    `skipped_channel_3` VARCHAR(18) NOT NULL DEFAULT 'Indéfini',

    UNIQUE INDEX `Channels_serverId_key`(`serverId`),
    PRIMARY KEY (`serverId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `AntiRaid`;
CREATE TABLE IF NOT EXISTS `AntiRaid` (
    `serverId` VARCHAR(18) NOT NULL,
    `join_times` INTEGER NOT NULL DEFAULT 3,
    `join_timeout` INTEGER NOT NULL DEFAULT 20000,

    UNIQUE INDEX `AntiRaid_serverId_key`(`serverId`),
    PRIMARY KEY (`serverId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
    `memberId` VARCHAR(18) NOT NULL,
    `serverId` VARCHAR(18) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT 'Aucune description fournie',

    UNIQUE INDEX `Users_serverId_key`(`serverId`),
    UNIQUE INDEX `Users_memberId_key`(`memberId`),
    PRIMARY KEY (`memberId`, `serverID`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Leveling`;
CREATE TABLE IF NOT EXISTS `Leveling` (
    `memberId` VARCHAR(18) NOT NULL,
    `level` INTEGER NOT NULL DEFAULT 1,
    `booster` CHAR(1) NOT NULL DEFAULT 'D',
    `xp_farmed` INTEGER NOT NULL DEFAULT 0,
    `xp_needed` INTEGER NOT NULL DEFAULT 200,

    UNIQUE INDEX `Leveling_memberId_key`(`memberId`),
    PRIMARY KEY (`memberId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Economy`;
CREATE TABLE IF NOT EXISTS `Economy` (
    `memberId` VARCHAR(18) NOT NULL,
    `money` INTEGER NOT NULL DEFAULT 5000,
    `bank` INTEGER NOT NULL DEFAULT 0,
    `casino` INTEGER NOT NULL DEFAULT 5,

    UNIQUE INDEX `Economy_memberId_key`(`memberId`),
    PRIMARY KEY (`memberId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Moderation`;
CREATE TABLE IF NOT EXISTS `Moderation` (
    `memberId` VARCHAR(18) NOT NULL,
    `serverId` VARCHAR(18) NOT NULL,
    UNIQUE INDEX `Moderation_memberId_serverID_key`(`memberId`, `serverId`),
    PRIMARY KEY (`memberId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Bans`;
CREATE TABLE IF NOT EXISTS `Bans` (
    `memberId` VARCHAR(18) NOT NULL,
    `date` BIGINT NOT NULL,
    `reason` VARCHAR(191) NOT NULL DEFAULT 'Aucune raison fournie',
    `moderator` VARCHAR(18) NOT NULL DEFAULT 'Indéfini',

    UNIQUE INDEX `Bans_memberId_date_key`(`memberId`, `date`),
    PRIMARY KEY (`memberId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Kick`;
CREATE TABLE IF NOT EXISTS `Kick` (
    `memberId` VARCHAR(18) NOT NULL,
    `date` BIGINT NOT NULL,
    `reason` VARCHAR(191) NOT NULL DEFAULT 'Aucune raison fournie',
    `moderator` VARCHAR(18) NOT NULL DEFAULT 'Indéfini',

    UNIQUE INDEX `Kick_memberId_date_key`(`memberId`, `date`),
    PRIMARY KEY (`memberId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Mute`;
CREATE TABLE IF NOT EXISTS `Mute` (
    `memberId` VARCHAR(18) NOT NULL,
    `date` BIGINT NOT NULL,
    `reason` VARCHAR(191) NOT NULL DEFAULT 'Aucune raison fournie',
    `moderator` VARCHAR(18) NOT NULL DEFAULT 'Indéfini',

    UNIQUE INDEX `Mute_memberId_date_key`(`memberId`, `date`),
    PRIMARY KEY (`memberId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Warn`;
CREATE TABLE IF NOT EXISTS `Warn` (
    `memberId` VARCHAR(18) NOT NULL,
    `date` BIGINT NOT NULL,
    `reason` VARCHAR(191) NOT NULL DEFAULT 'Aucune raison fournie',
    `moderator` VARCHAR(18) NOT NULL DEFAULT 'Indéfini',

    UNIQUE INDEX `Warn_memberId_date_key`(`memberId`, `date`),
    PRIMARY KEY (`memberId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Modules` ADD CONSTRAINT `Modules_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Servers`(`serverId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Channels` ADD CONSTRAINT `Channels_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Servers`(`serverId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `AntiRaid` ADD CONSTRAINT `AntiRaid_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Servers`(`serverId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Users` ADD CONSTRAINT `Users_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Servers`(`serverId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Leveling` ADD CONSTRAINT `Leveling_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Users`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Economy` ADD CONSTRAINT `Economy_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Users`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Moderation` ADD CONSTRAINT `Moderation_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Users`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Bans` ADD CONSTRAINT `Bans_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Moderation`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Kick` ADD CONSTRAINT `Kick_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Moderation`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Mute` ADD CONSTRAINT `Mute_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Moderation`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Warn` ADD CONSTRAINT `Warn_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Moderation`(`memberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
