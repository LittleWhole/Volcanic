const Discord = require('discord.js');

exports.run = async (client, message, cmd, args, perms, config) => {
	if (!args[0]) {
	  var helpEmbed = new Discord.MessageEmbed()
    .setTitle(`__**\`<=/^\\=> |-| Volcanic Command List |-| <=/^\\=>\`**__`)
    .setDescription(`Use ${config.prefix}help <command> for details on a certain command.\n\n${client.commands.map(c=>`[${c.help.category}] **\`${c.help.name}\`** - ${c.help.description}`).join("\n")}`)
    .setColor(0xf47442)
    .setTimestamp();
    message.channel.send({ embed: helpEmbed });
  } else {
	let command = args[0];
	if (client.commands.has(command)) {
    command = client.commands.get(command);
    if (command === null || command === undefined || !command) return message.channel.send("I could not get the requested command! Does it exist?");
    var helpEmbedTwo = new Discord.MessageEmbed()
    .setTitle(`Command: \`${command.help.name}\` `)
    .setDescription(`${command.help.description}\n\n**Category:** ${command.help.category}\n**Command Usage** - ${command.help.name} ${command.help.usage}\n**Permission Level Required:** ${command.conf.permLevel}`)
    .setColor(0xf47442)
    .setTimestamp();
    message.channel.send({ embed: helpEmbedTwo });
	}
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name : "help",
  description: "Get a list of commands.",
  usage: "[command]",
  category: "Information"
};