const { MessageEmbed } = require("discord.js")

module.exports = async(client) => {

  client.distube.on('playSong', (queue, song) => 
    queue.textChannel.send({ embeds: [
      new MessageEmbed()
      .setColor("ORANGE")
      .setTitle(`${client.emoji.radio} - Now Playing`)
      .setDescription(`${client.emoji.music} - [**${song.name}**](${song.url})`)
      .addField("Requested By", `${song.user}`, true)
      .addField("Song Duration", `${song.formattedDuration}`, true)
    ]}) )
  client.distube.on('finishSong', (queue) => {
    queue.textChannel.send(`**Finish!**`)
  })
  client.distube.on("addList", (queue, playlist) => queue.textChannel.send(
        `${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue`
    ))
  client.distube.on('addSong', (queue, song) => {
    queue.textChannel.send(`${client.emoji.success} - **Added \`${song.name}\` to queue**`)
  })
  client.distube.on('error', (textChannel, e) => {
    textChannel.send(`${client.emoji.error} - An error encountered: ${e}`)
  })
  client.distube.on('disconnect', queue => queue.textChannel.send(`${client.emoji.goodbye} - Disconnected!`))
  client.distube.on('empty', queue => queue.textChannel.send(`${client.emoji.error} - Voice Channel is Empty! Leaving the channel....`))
  client.distube.on('searchResult', (message, result) => {
		let i = 0
		message.channel.send({ embed: [
      new MessageEmbed()
      .setColor("ORANGE")
      .setDescription(`${client.emoji.radio} - **Choose an option from below**\n\n${result.map(song => `**${++i}** - ${song.name} - \`${song.formattedDuration}\``).join('\n')}\n\n**Enter anything else or wait 30 seconds to cancel**`)
    ]})
	})
  client.distube.on('searchCancel', message => message.channel.send(`${client.emoji.failed} - Searching canceled`))
  client.distube.on('searchInvalidAnswer', message =>
		message.channel.send(`${client.emoji.failed} - Search Invalid Answer`))
  client.distube.on('searchNoResult', message => message.channel.send(`${client.emoji.failed} - No result found!`))
  client.distube.on("finish", queue => queue.textChannel.send("Finished!"))
}