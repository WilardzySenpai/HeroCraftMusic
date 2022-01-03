const fs = require('fs');

module.exports = async(client) => {
  const load = dir => {
    const category = fs.readdirSync(`./commands/${dir}/`).filter(d => d.endsWith(".js"));
    for (const file of category) {
      const commands = require(`../commands/${dir}/${file}`)
      console.log(`${client.emoji.success}${commands.name} is loaded!`)
      client.commands.set(commands.name, commands)
      if(commands.aliases) {
        commands.aliases.forEach(x => client.aliases.set(x, commands.name))
      }
    };
  };
  ["music", "utility"].forEach(x => load(x));
}
