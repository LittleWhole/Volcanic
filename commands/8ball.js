const Discord = require('discord.js');

exports.run = async (client, message, command, args, perms, config) => {
    const responses = [
        // Affirmative
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes, definitely.",
        "You may rely on it.",
        "You can count on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Absolutely.",

        // Non-commital
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",

        // Negative
        "Don't count on it.",
        "My reply is no.",
        "My sources say no,",
        "Outlook not so good.",
        "Very doubtful.",
        "Chances aren't good."
    ]
    let eightBall = new Discord.MessageEmbed()
    .setTitle(`${message.author.tag} asks the Magic :8ball: Ball:`)
    .addField(args.join(" "), responses[Math.floor(Math.random() * (responses.length - 1))])
    .setColor(config.color)
    .setTimestamp();

    message.channel.send({ embed: eightBall });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "8ball",
    description: "Ask a question to the Magic 8 Ball.",
    usage: "<question>",
    category: "Fun"
}