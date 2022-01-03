const db = require("quick.db");

module.exports = {
  name: "loop",
  aliases: ["lp", "repeat"],
  category: "music",
  description: "Toggle Loop Mode",
  usage: "< off | single | all >",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    const { prefix } = client.Guilds.get(message.guild.id)

    if (!message.member.voice.channel) return message.reply(`${client.emoji.error} - You're not in a voice channel !`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emoji.error} - You are not in the same voice channel !`);

    let queue = client.distube.getQueue(message);
    if(!queue) return message.reply(`${client.emoji.error} - Server Queue is empty!`);
    if(!args[0]) return message.reply(`${client.emoji.error} - ${prefix}loop [ off | single | all ]`);

    let mode = null;
    switch (args[0]) {
      case "off":
        mode = 0
      break;
      case "single":
        mode = 1
      break;
      case "all":
        mode = 2
      break;
    }
    mode = queue.setRepeatMode(mode);
    mode = mode ? mode === 2 ? "Queue" : "Song" : "Off"
    message.reply(`${client.emoji.success} - Set Repeat Mode to \`${mode}\``)
  }
}