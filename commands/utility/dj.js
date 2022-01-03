const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "dj",
  aliases: [""],
  category: "utility",
  description: "Show the dj status",
  usage: "",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    const { dj, djrole } = client.Guilds.get(message.guild.id);
    const role = message.guild.roles.cache.get(djrole);
    const embed = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(`**Dj Mode Status in ${message.guild.name}**\n\nTo change the dj status visit the [Dashboard](${client.dashboard.URL})`)
    .setThumbnail(`${client.user.displayAvatarURL()}`)
    .addField(`Dj Only`, `${dj === 1 ? "Enable" : "Disable"}`, true)
    .addField(`Dj Role`, `${role || "None"}`, true)
    .setFooter(`${client.user.username} v.1.2`, `${client.user.displayAvatarURL()}`)

    message.reply({ embeds: [embed]})
  }
}