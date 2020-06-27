const Discord = require('discord.js');

exports.run = async (client, message, command, args, perms, config) => {
    let user = message.mentions.members.first();
    let mod = message.author;
    let banReason = args.slice(1).join(" ");
    let modlog = message.guild.channels.cache.find(channel => channel.name === 'mod-log');
    if (!user) return message.reply("Please mention who you want to ban!")
    if (!banReason) return message.reply("Please include a reason on why you want to ban this user!")
    if (!modlog) message.reply("I cannot find a mod-log! The ban log will be put into this channel.")
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("I do not have permission to ban users.")
    if (user === message.author) return message.reply("You cannot ban yourself.")
    user.ban(banReason).then(banned => {
        let banEmbed = new Discord.MessageEmbed()
        .setAuthor("Ban", mod.avatarURL)
        .addField("User", banned, true).addField("Moderator", mod, true)
        .addField("Reason", banReason)
        .setThumbnail(banned.avatarURL)
        .setColor(config.colors.red)
        .setFooter("Ban").setTimestamp();
        if (modlog) modlog.send({ embed: banEmbed });
        else message.channel.send({ embed: banEmbed });
    }).catch(() => {
        message.reply("There was an issue banning this user.")
        console.error;
    });
    message.channel.send(":white_check_mark: Successfully banned the user.");
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
}

exports.help = {
    name: "ban",
    description: "Ban a user.",
    usage: "<user> <reason>",
    category: "Moderation"
}