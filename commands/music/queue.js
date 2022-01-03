const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "queue",
  aliases: ["q"],
  category: "music",
  description: "Show Server's Queue",
  usage: "",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    let queue = client.distube.getQueue(message);
    if(!queue) return message.reply(`${client.emoji.error} - Server Queue is empty!`);
    
    message.reply({embeds: [
      new MessageEmbed()
      .setColor("ORANGE")
      .setTitle(`${message.guild.name}'s Queue`)
      .setDescription(`${queue.songs.map((song, i) => `${i === 0 ? `${client.emoji.music} - **Playing -**` : `${i}`} [${song.name} - \`${song.formattedDuration}\` - ( Requested By: ${song.user})](${song.url})`).slice(0, 10).join(`\n`)}`)
    ]})
  }
}