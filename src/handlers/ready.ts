import { Application } from "../interfaces/application";
import { Handler } from "../interfaces/handler";
import { ActivityType } from "discord.js";
import abbreviate from "numabbr";

import { name, version } from "../../package.json";

export const ready: Handler = {
  async executeHandler(client: Application) {
    let memberCount = 0;
    client.guilds.cache.forEach((guild) => {
      memberCount += guild.memberCount;
    });

    let statuts: string[] = [
      `Programme : ${name}@${version}`,
      `Surveille ${client.guilds.cache.size} serveurs`,
      `Protège ${abbreviate(memberCount)} utilisateurs`,
      "https://zeskel.spyraling.fr",
    ];

    setInterval(() => {
      let randomiser = Math.floor(Math.random() * statuts.length);
      client.user?.setActivity({
        name: statuts[randomiser],
        type: ActivityType.Listening,
      });
    }, 20000);

    client
      .getLogger()
      .send(
        `Le client est maintenant connecté en tant que : ${client.user?.tag}`,
        "READY"
      );
  },

  settings: {
    enabled: true,
  },
};

export default ready;
