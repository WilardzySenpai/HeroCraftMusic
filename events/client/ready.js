const { formatDate } = require("../../function");
const db = require("quick.db");

module.exports = async(client, message) => {
  const totalUsers = client.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)
  console.log(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${totalUsers} users`);
  const Time = formatDate(Date.now());
  // let totalUsers = client.users.cache.size
  // var activities = [ `${client.guilds.cache.size} servers`, `${client.channels.cache.size} channels`, `${totalUsers} users!`, `24/7 online`, `Invite Now!` ], i = 0;
  // setInterval(() => client.user.setActivity(`hc!help | ${activities[i++ % activities.length]}`, { type: "LISTENING" }), 2000)
  client.user.setActivity(`New Update: https://bit.ly/3GkFm68`)
  
  
}