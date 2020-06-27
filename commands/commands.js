const Discord = require('discord.js');
const Algorithms = require('../functions/algorithms.js');
const { isNullOrUndefined } = require('util');
const algs = new Algorithms();

exports.run = async (client, message, cmd, args, perms, config) => {
  if (!args[0]) {
    message.reply("I've sent a DM with the full commands list to you. Please check your DMs.")
    let myCommands = client.commands;
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = new Discord.MessageEmbed().setTitle("Command List").setDescription(`Use ${config.prefix}help <command> for details`).setFooter("Volcanic by LittleWhole#1337").setColor(config.color).setTimestamp();
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);
    sorted.forEach(c => {
      const cat = c.help.category;
      if (currentCategory !== cat) {
        message.author.send({ embed: output });
        output = new Discord.MessageEmbed().setColor(algs.toColor(cat)).setFooter("Volcanic by LittleWhole#1337").setTimestamp();
        output.setTitle(cat);
        currentCategory = cat;
      }
      output.addField(`${config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)}`, `${c.help.description}\n`, true);
    });
    message.author.send({ embed: output });
  } else {
    // Show individual command's help.
    let command = args[0];
    if (command === null || command === undefined || !command) return message.channel.send("I could not get the requested command! Does it exist?");
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      let output = new Discord.MessageEmbed()
      .setTitle(config.prefix + command.help.name)
      .setDescription(command.help.description)
      .addField("Usage", `${config.prefix}${command.help.name} ${command.help.usage}`, true)
      .addField("Permission Level", command.conf.permLevel, true)
      .setColor(algs.toColor(command.help.category))
      .setFooter("Volcanic by LittleWhole#1337")
      .setTimestamp();
      if (command.conf.aliases.length >= 0) {
        output.addField("Aliases", "None", true);
      }
      else {
        output.addField("Aliases", command.conf.aliases.join(", "), true);
      }
      message.channel.send({ embed: output });
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "commands",
  description: "Get a list of commands.",
  usage: "[command]",
  category: "Information"
};