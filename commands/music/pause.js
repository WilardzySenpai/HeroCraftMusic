module.exports = {
  name: "pause",
  aliases: [""],
  category: "music",
  description: "Pause the music for you",
  usage: "",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply(`${client.emoji.error} - You're not in a voice channel !`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emoji.error} - You are not in the same voice channel !`);

    let queue = client.distube.getQueue(message);
    if(!queue) return message.reply(`${client.emoji.error} - No music currently playing !`);

    if(queue.pause) return message.reply(`${client.emoji.error} - Music is already Paused !`);

    queue.pause()
    message.reply(`${client.emoji.success} - Paused the music!`)
  }
}