const Discord = require('discord.js');

exports.run = async (client, message, command, args, perms, config) => {
    message.channel.send(`**0** Member\n**1** Chat Moderator\n**2** Permissions Moderator\n**3** Moderator\n**4** Manager\n**5** Admin\n**6** Guild Owner\n**7** Reserved\n**8** Retrace\n**9** FrostTaco/Goseale\n**10** Developer\n**11** Reserved\n\nYou are permission level **${perms}**.`)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "perms",
    description: "Permission level information",
    usage: "",
    category: "Information"
}