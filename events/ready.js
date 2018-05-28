module.exports = client => {
  console.log(`>> Volcanic has started. <<\n=========================\nSTATISTICS\n${client.users.size} users\n${client.channels.size} channels\n${client.guilds.size} servers`);
});
