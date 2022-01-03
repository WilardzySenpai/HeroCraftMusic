module.exports = {
  name: "play",
  aliases: ["p"],
  category: "music",
  description: "Play a music you want",
  usage: "[song Url | song Name]",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    if(!message.member.voice.channel) return message.reply(`${client.emoji.failed} You're not in Voice Channel!`);
    if(!args[0]) return message.reply(`${client.emoji.failed} Please enter your query`);
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emoji.failed} You are not in the sane voice channel!`);
    client.distube.play(message, args.join(" "))
  }
}