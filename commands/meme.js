const Discord = require('discord.js');
var request = require('request');

exports.run = async (client, message, command, args, perms, config) => {
    if (args.length === 0) {
        request(`https://meme-api.herokuapp.com/gimme`, function (error, response, body) {
            let meme = JSON.parse(body);
            let memeEmbed = new Discord.MessageEmbed()
            .setTitle(meme.title)
            .setImage(meme.url)
            .setColor(config.color)
            .setFooter(`From r/${meme.subreddit} • ${meme.postLink} • Volcanic by LittleWhole#1337`)
            .setTimestamp();
            message.channel.send({ embed: memeEmbed });
        })
    } else {
        request(`https://meme-api.herokuapp.com/gimme/${args[0]}`, function (error, response, body) {
            let meme = JSON.parse(body);
            if (meme.title == undefined) return message.reply("That subreddit does not exist.");
            let memeEmbed = new Discord.MessageEmbed()
            .setTitle(meme.title)
            .setImage(meme.url)
            .setColor(config.color)
            .setFooter(`From r/${meme.subreddit} • ${meme.postLink} • Volcanic by LittleWhole#1337`)
            .setTimestamp();
            message.channel.send({ embed: memeEmbed });
        })
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "meme",
    description: "Shows a random meme. Add an argument for a specific subreddit",
    usage: "[subreddit]",
    category: "Meme"
}