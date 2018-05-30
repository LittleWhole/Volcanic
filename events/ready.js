module.exports = async (client, config) => {
  client.on("ready", () => {
    console.log(`>> Volcanic has started. <<\n=========================\nSTATISTICS\n${client.users.size} users\n${client.channels.size} channels\n${client.guilds.size} servers`);
    client.user.setActivity("v!help for commands", { type: 0 });
    setInterval(() => {
      setTimeout(() => {
        client.user.setActivity("v!help for commands", { type: 0 });
      }, 10000);
      setTimeout(() => {
        client.user.setActivity(`${client.users.size} users | v!help`, { type: 0 });
      }, 10000);
      setTimeout(() => {
        client.user.setActivity(`${client.guilds.size} servers | v!help`, { type: 0 });
      }, 10000);
    }, 30000);
  });
};
