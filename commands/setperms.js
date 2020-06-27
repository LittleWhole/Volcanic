const Discord = require('discord.js');

exports.run = async (client, message, command, args, perms, config) => {
   perms = args[0];
   client.permissions(message, args[0]);
   message.reply(`Set your permission level to **${perms}**`);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 10
}

exports.help = {
    name: "setperms",
    description: "Set permission level",
    usage: "",
    category: "Developer"
}