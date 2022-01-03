module.exports = {
  name: "resume",
  aliases: [""],
  category: "music",
  description: "Resume Music For You",
  usage: "",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply(`${client.emoji.error} - You're not in a voice channel !`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emoji.error} - You are not in the same voice channel !`);

    let queue = client.distube.getQueue(message);
    if(!queue) return message.reply(`${client.emoji.error} - No music currently playing !`);
    
    queue.resume()
    message.reply(`${client.emoji.success} - Resumed the music!`)
  }
}