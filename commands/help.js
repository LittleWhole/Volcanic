const Discord = require('discord.js');

exports.run = async (client, message, cmd, args, perms, config) => {
	var helpEmbed = new Discord.MessageEmbed()
    .setTitle(`Help`)
    .setDescription(`Volcanic is a very powerful multipurpose bot that fits nicely on any server.`)
    .addField(":tools: Developer", "LittleWhole#1337", true)
    .addField(":desktop: Website", "http://volcanic.littlewhole.com", true)
    .addField(":link: Invite Link", "https://discordapp.com/oauth2/authorize?client_id=450514932262371329&permissions=8&scope=bot", false)
    .addField(":question: Support Server", "https://discord.gg/X5Nmss7", true)
    .addField(":pray: Patreon", "https://patreon.com/LittleWhole", true)
    .addField(":notepad_spiral: Commands", "Do v!commands", true)
    .setColor(0xf47442)
    .setFooter("Volcanic by LittleWhole#1337")
    .setTimestamp();
    message.channel.send({ embed: helpEmbed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name : "help",
  description: "View bot help.",
  usage: "[command]",
  category: "Information"
};