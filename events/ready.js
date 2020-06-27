module.exports = async (client, config) => {
  client.on("ready", () => {
    console.log(`>> Volcanic has started. <<\n=========================\nSTATISTICS\n${client.users.cache.size} users\n${client.channels.cache.size} channels\n${client.guilds.cache.size} servers`);
    var counter = -1;
    setInterval(() => {
      const playingMessages = [
        "v!help for help",
        `${client.users.cache.size} users | v!help`,
        `${client.guilds.cache.size} servers | v!help`,
        `${config.version} | v!help`
      ];
      counter++;
      client.user.setActivity(playingMessages[counter], { type: 0 });
      if (counter >= 3) counter = -1;
    }, 12000);
  });
};
