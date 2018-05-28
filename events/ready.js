module.exports = async (client, config) => {
  client.on("ready", () => {
	  console.log(`>> Volcanic has started. <<\n=========================\nSTATISTICS\n${client.users.size} users\n${client.channels.size} channels\n${client.guilds.size} servers`);
  });
};
