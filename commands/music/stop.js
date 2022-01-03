module.exports = {
  name: "stop",
  aliases: [""],
  category: "music",
  description: "Stop your music",
  usage: "",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    if(!message.member.voice.channel) return message.reply(`${client.emoji.failed} You're not in Voice Channel!`);
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emoji.failed} You are not in the sane voice channel!`);

    let queue = client.distube.getQueue(message);

    if(!queue) return message.reply(`${client.emoji.failed} You can't stop noting!`)

    queue.stop();
    message.reply(`${client.emoji.success} - Music **Stopped** in this server!`)
    
  }
}