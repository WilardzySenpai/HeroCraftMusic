const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "utility",
  description: "Get all of the available commands",
  usage: "<command name | aliases>",
  accessibility: "everyone",
  
  run: async (client, message, args) => {
    const { prefix } = client.Guilds.get(message.guild.id);
    if(!args[0]) {
      const embed = new MessageEmbed()
      .setColor("ORANGE")
      .setDescription(`**Customize your server settings by accessing the [Dashboard](${client.dashboard.URL})**\n\n**These are the available commands for ${client.user.username}**\n**For Help Related To A Particular Command Type -**\n\`${prefix}help <command name | aliases>\``)
      .addField("🔧Utility Commands", `${client.commands.filter(x => x.category === "utility").map(x => "`" + x.name + "`").join(", ")}`)
      .addField("🎶Music Commands", `${client.commands.filter(x => x.category === "music").map(x => "`" + x.name + "`").join(", ")}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(`${client.user.username} v.1.2`, `${client.user.displayAvatarURL()}`)
      message.reply({embeds: [embed]})
    } else {
      const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

      if(!command) return message.reply(`${client.emoji.failed} I can't find that ${args[0]} command! Try \`${prefix}help\` to view all commands`);

      const embed = new MessageEmbed()
      .setColor("ORANGE")
      .setDescription(`**${client.user.username} Help Panel**\n\nFind information on the command provided.\nMandatory arguments \`[]\`, optional arguments \`<>\`.\n\n**Name:** ${command.name}\n**Aliases:** ${command.aliases}\n**Description:** ${command.description}\n**Usage:** ${prefix}${command.name} ${command.usage}\n**Accessible By:** ${command.accessibility}`)
      .setFooter(`${client.user.username} v.1.2`, `${client.user.displayAvatarURL()}`)

      message.reply({embeds: [embed]})
    }
  }
}