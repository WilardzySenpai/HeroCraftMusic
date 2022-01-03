module.exports = {
  name: "seek",
  aliases: [""],
  category: "music",
  description: "Change track position",
  usage: "[ position ]",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply(`${client.emoji.error} - You're not in a voice channel !`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emoji.error} - You are not in the same voice channel !`);

    let queue = client.distube.getQueue(message);
    if(!queue) return message.reply(`${client.emoji.error} - Server Queue is empty!`);

    if(!args[0]) return message.reply(`${client.emoji.error} - Please enter the position (in seconds) to seek`)
    const time = Number(args[0]);
    if(isNaN(time)) return message.reply(`${client.emoji.error} - Please enter a valid number`)

    queue.seek(time)
    message.reply(`${client.emoji.success} - Seeked to ${time}`)
  }
}