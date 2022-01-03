module.exports = {
  name: "volume",
  aliases: ["v"],
  category: "music",
  description: "Adjust Music Volume",
  usage: "<number>",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply(`${client.emoji.error} - You're not in a voice channel !`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emoji.error} - You are not in the same voice channel !`);

    let queue = client.distube.getQueue(message);
    if(!queue) return message.reply(`${client.emoji.error} - Server Queue is empty!`);
    const volume = parseInt(args[0]);
    if(isNaN(volume)) return message.reply(`${client.emoji.error} - Please enter a valid number`)

    queue.setVolume(volume)
    message.reply(`${client.emoji.success} - Volume Set to ${volume}`)
  }
}