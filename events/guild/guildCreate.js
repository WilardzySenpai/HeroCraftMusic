const { MessageEmbed, Permissions } = require("discord.js");

module.exports = (client, guild) => {
  client.Guilds.ensure(guild.id, {
    prefix: client.prefix,
    deletecmd: 0,
    dj: 0,
    djrole: []
  });

  let chnl = [];

  guild.channels.cache.filter(channel => {
    if(channel.type === "GUILD_TEXT" && channel.permissionsFor(guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) return chnl = channel.id;
  })
  const { prefix } = client.Guilds.get(guild.id);
  guild.channels.cache.get(chnl).send({ embeds: [
    new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(`Hey **${guild.name}**, Im **${client.user.username}**\n\nThank you for adding me here! You can get started with [${prefix}help](${client.dashboard.support}) and customize your server settings by accessing the [Dashboard](${client.dashboard.URL}) \n\nAgain, thank you for adding me\n**- ${client.user.username}**\n\n**Important Links**\n**[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) | [Support](${client.dashboard.support}) | [Dashboard](${client.dashboard.URL})**`)
    .setThumbnail(`${client.user.displayAvatarURL()}`)
  ]})
}