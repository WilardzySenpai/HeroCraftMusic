module.exports = {
  name: "skip",
  aliases: ["next"],
  category: "music",
  description: "Skip the current playing",
  usage: "",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply(`${client.emoji.error} - You're not in a voice channel !`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emoji.error} - You are not in the same voice channel !`);

    let queue = client.distube.getQueue(message);

    if (!queue) return message.reply(`${client.emoji.error} - No music currently playing !`);

    const success = queue.skip();

    if (success) message.reply(`${client.emoji.success} - The current music has just been **skipped** !`);
  }
}