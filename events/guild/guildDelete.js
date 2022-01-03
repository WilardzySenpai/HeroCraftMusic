module.exports = (client, guild) => {
  client.Guilds.delete(guild.id)
}