const math = require('math-expression-evaluator');
const Discord = require('discord.js');

exports.run = async (client, message, command, args, perms, config) => {
    let output;
    try {
        output = math.eval(args.join(" "));
    } catch(e) {
        output = "Error: \"Invalid input!\""
    } finally {
        let mEmbed = new Discord.MessageEmbed()
        .setTitle("Math Evaluation")
        .addField("Input", `\`\`\`JavaScript\n${args.join(" ")}\`\`\``, true)
        .addField("Output", `\`\`\`JavaScript\n${output}\`\`\``, true)
        .setColor(config.color)
        .setTimestamp();
        message.channel.send({ embed: mEmbed });
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "math",
    description: "Evaluate a mathematical expression.",
    usage: "<expression>",
    category: "Math"
}
