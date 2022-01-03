const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  aliases: [""],
  category: "utility",
  description: "Show the bot ping",
  usage: "",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    message.reply("**PINGING........**").then(msg => {
      setTimeout(() => {
        msg.delete()
        message.reply({ embeds: [
          new MessageEmbed()
          .setColor("ORANGE")
          .setDescription(`${client.emoji.success} - **Ping:** \`${client.ws.ping}ms\``)
          .setTimestamp()
          .setFooter(`${client.user.username} v.1.2`, `${client.user.displayAvatarURL()}`)
        ]})
      }, 3000)
    })
  }
}