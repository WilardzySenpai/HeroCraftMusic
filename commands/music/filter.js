module.exports = {
  name: "filter",
  aliases: ["f"],
  category: "music",
  description: "Add some filters",
  usage: "<filter type | off>",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply(`${client.emoji.error} - You're not in a voice channel !`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emoji.error} - You are not in the same voice channel !`);

    const { prefix } = client.Guilds.get(message.guild.id);
    const queue = client.distube.getQueue(message);
    if(!queue) return message.reply(`${client.emoji.error} - Server Queue is empty!`);
    if(client.filter.includes(args[0])) {
      queue.setFilter(args[0])
      message.reply(`${client.emoji.success} - Added **${args[0]}** to queue filter`)
    } else if(args[0] === "off") {
      queue.setFilter(false)
      message.reply(`${client.emoji.success} - Removing all queue filters`)
    } else if(!client.filter.includes(args[0])){
      message.reply(`${client.emoji.failed} - Try \`${prefix}filters\` to view all available filters`)
    }
  }
}