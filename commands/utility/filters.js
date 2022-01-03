const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "filters",
  aliases: [""],
  category: "utility",
  description: "Show the available filters of the bot",
  usage: "",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    const { prefix } = client.Guilds.get(message.guild.id)
    const embed = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(`**To use Filters type:** \`${prefix}filter <filter type | off>\`\n\n**Here Are the available Filter Type**\n\`${client.filter.map((x) => x ).join(`, `)}\``)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`${client.user.username} v.1.2`, `${client.user.displayAvatarURL()}`)
    message.reply({ embeds: [embed]})
  }
}