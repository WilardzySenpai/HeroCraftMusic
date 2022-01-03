const { MessageEmbed } = require("discord.js");
module.exports = async(client, message) => {
  const { prefix, deletecmd, djrole, dj } = client.Guilds.get(message.guild.id);
  if(message.author.bot || message.channel.type === "dm") return;
  if(!message.content.startsWith(prefix)) return;
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  const commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if(!commands) {
    message.react(client.emoji.failed)
    return message.channel.send(`${client.emoji.failed} I can't find that ${cmd} command! Try \`${prefix}help\` to view all commands`)
  } else {
    const djroles = message.member.roles.cache.get(djrole)
    if(commands.category === "music" && dj === 1 && djroles) {
      if(deletecmd === 1) {
        console.log(`User: ${message.author.tag} (${message.author.id}) | Server: ${message.guild.id} | Command Executed: ${commands.name}`)
        commands.run(client, message, args)
        setTimeout(() => {
          message.delete()
        }, 2000)
      } else {
        console.log(`User: ${message.author.tag} (${message.author.id}) | Server: ${message.guild.id} | Command Executed: ${commands.name}`)
        return commands.run(client, message, args)
      }
    } else if(commands.category === "music" && dj === 1 && !djroles) {
      return message.channel.send(`${client.emoji.failed} - You Do Not Have A Dj Role`)
    } else if(commands.category === "music" && dj === 0 || commands.category === "utility") {
      if(deletecmd === 1) {
        console.log(`User: ${message.author.tag} (${message.author.id}) | Server: ${message.guild.id} | Command Executed: ${commands.name}`)
        commands.run(client, message, args)
        setTimeout(() => {
          message.delete()
        }, 2000)
      } else {
        console.log(`User: ${message.author.tag} (${message.author.id}) | Server: ${message.guild.id} | Command Executed: ${commands.name}`)
        return commands.run(client, message, args)
      }
    }
  }
}