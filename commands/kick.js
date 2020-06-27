const Discord = require('discord.js');

exports.run = async (client, message, command, args, perms, config) => {
    let user = message.mentions.users.first();
    let mod = message.author;
    let kickReason = args.slice(1).join(" ");
    let modlog = message.guild.channels.cache.find(channel => channel.name === 'mod-log');
    if (!user) return message.reply("Please mention who you want to kick!")
    if (!kickReason) return message.reply("Please include a reason on why you want to kick this user!")
    if (!modlog) message.reply("I cannot find a mod-log! The kick log will be put into this channel.")
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("I do not have permission to kick users.")
    if (user === message.author) return message.reply("You cannot kick yourself.")
    user.kick(kickReason).then(kicked => {
        let kickEmbed = new Discord.MessageEmbed()
        .setAuthor("Kick", mod.avatarURL)
        .addField("User", kicked, true).addField("Moderator", mod, true)
        .addField("Reason", kickReason)
        .setThumbnail(kicked.avatarURL)
        .setColor(config.colors.orange)
        .setFooter("Kick").setTimestamp();
        if (modlog) modlog.send({ embed: kickEmbed });
        else message.channel.send({ embed: kickEmbed });
    }).catch(message.reply("There was an issue kicking this user."));
    message.channel.send(":white_check_mark: Successfully kicked the user.")
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
}

exports.help = {
    name: "kick",
    description: "Kick a user.",
    usage: "<user> <reason>",
    category: "Moderation"
}