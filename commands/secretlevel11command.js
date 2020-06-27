const Discord = require('discord.js');

exports.run = async (client, message, command, args, perms, config) => {
    message.channel.send(`ur lvl 11 lmao`)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 11
}

exports.help = {
    name: "secretlevel11command",
    description: "tehe",
    usage: "",
    category: "Developer"
}