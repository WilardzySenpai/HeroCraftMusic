const fs = require('fs');

module.exports = (client) => {
  const load = dir => {
    const event = fs.readdirSync(`./events/${dir}/`).filter(x => x.endsWith('.js'));
    for (let file of event) {
      const evt = require(`../events/${dir}/${file}`);
      const eName = file.split('.')[0];
      console.log(`${client.emoji.success}${file} client event is loaded!`)
      client.on(eName, evt.bind(null, client))
    };
  };
  ["client", "guild"].forEach(x => load(x))
}