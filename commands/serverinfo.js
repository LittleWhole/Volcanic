const Discord = require('discord.js');

exports.run = async (client, message, command, args, perms, config) => {
    let mEmbed = new Discord.MessageEmbed()
    .setImage(message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.guild.name}'s Server Info`, message.guild.iconURL)
    .addField("Server", `${message.guild.name} (${message.guild.id})`)
    .addField("Date of Creation", message.guild.createdAt)
    .addField("Server Owner", `${message.guild.owner} (${message.guild.ownerID})`)
    .addField("Server Region", message.guild.region, true)
    .addField("Server Channels", message.guild.channels.size, true)
    .addField("Server Roles", message.guild.roles.size, true)
    .addField("Server Members", message.guild.members.size, true)
    .addField("Server Emojis", message.guild.emojis.size, true)
    .addField("Verified?", message.guild.verified, true)
    .setColor(config.color)
    .setTimestamp()

    message.channel.send({ embed: mEmbed });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "serverinfo",
    description: "Get information about the server",
    usage: "",
    category: "Information"
}