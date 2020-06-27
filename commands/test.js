const Discord = require('discord.js');

exports.run = async (client, message, command, args, perms, config) => {
    message.channel.send(`**Your permission level is ${perms}**\nFor information on permission levels, do v!perms`);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "test",
    description: "Test command - current purpose: Check your permission level",
    usage: "",
    category: "Developer"
}