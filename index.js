const { Client, Collection, MessageEmbed, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });
const DisTube = require("distube");
const Enmap = require("enmap")
const config = require("./config.json");

client.commands = new Collection;
client.aliases = new Collection;
client.config = config;
client.emoji = client.config.emoji;
client.prefix = client.config.discord.prefix;
client.distube = new DisTube.default(client, {
  searchSongs: 1,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 0,
	leaveOnFinish: true,
	leaveOnStop: true,
  customFilters: {
      "clear": "dynaudnorm=f=200",
      "lowbass": "bass=g=6,dynaudnorm=f=200",
      "bassboost": "bass=g=20,dynaudnorm=f=200",
      "purebass": "bass=g=20,dynaudnorm=f=200,asubboost,apulsator=hz=0.08",
      "8D": "apulsator=hz=0.08",
      "vaporwave": "aresample=48000,asetrate=48000*0.8",
      "nightcore": "aresample=48000,asetrate=48000*1.25",
      "phaser": "aphaser=in_gain=0.4",
      "tremolo": "tremolo",
      "vibrato": "vibrato=f=6.5",
      "reverse": "areverse",
      "treble": "treble=g=5",
      "normalizer": "dynaudnorm=f=200",
      "surrounding": "surround",
      "pulsator": "apulsator=hz=1",
      "subboost": "asubboost",
      "karaoke": "stereotools=mlev=0.03",
      "flanger": "flanger",
      "gate": "agate",
      "haas": "haas",
      "mcompand": "mcompand"
    }
});
client.dashboard = client.config.dashboard;
client.filter = [
      "clear",
      "lowbass",
      "bassboost",
      "purebass",
      "8D",
      "vaporwave",
      "nightcore",
      "phaser",
      "tremolo",
      "vibrato",
      "reverse",
      "treble",
      "normalizer",
      "surrounding",
      "pulsator",
      "subboost",
      "karaoke",
      "flanger",
      "gate",
      "haas",
      "mcompand"
    ]
client.Guilds = new Enmap({ name: "settings", dataDir: "./database/guild"});

["command", "event", "distube"].forEach(x => {
  require(`./handler/${x}`)(client)
})
client.on("ready", () => {
  require("./dashboard/dashboard.js")(client)
})
client.on("message", message => {
  const guilds = client.Guilds.get(message.guild.id);
      if(!guilds) {
        client.Guilds.ensure(message.guild.id, {
          prefix: client.prefix,
          deletecmd: 0,
          dj: 0,
          djrole: []
        });
      }
  const { prefix } = client.Guilds.get(message.guild.id);
  if(message.mentions.has(client.user)) return message.reply({ embeds: [
    new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(`**My prefix in this server is** \`${prefix}\`\n\n**Customize your server settings by accessing the [Dashboard](${client.dashboard.URL})**\n**You Have a Questions Join to our [Discord](${client.dashboard.support})**`)
    .setFooter(`${client.user.username} v.1.2`, `${client.user.displayAvatarURL()}`)
  ]})
})

client.login(client.config.discord.token)
