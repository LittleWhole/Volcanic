const Discord = require('discord.js');
const ms = require('ms');
const os = require('os');
const worker = require("core-worker");

exports.run = async (client, message, command, args, perms, config) => {
    const npmv = await worker.process("npm -v").death();
    let stats = new Discord.MessageEmbed()
    .setTitle("`Volcanic Statistics`")
    .addField("Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("Swap Partition Size", `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("Uptime", ms(client.uptime), true)
    .addField("Users", client.users.cache.size, true)
    .addField("Servers", client.guilds.cache.size, true)
    .addField("Channels", client.channels.cache.size, true)
    .addField("Emojis", client.emojis.cache.size, true)
    .addField("Library", "discord.js", true)
    .addField("Library Version", `v${Discord.version}`, true)
    .addField("Bot Created", client.user.createdAt, true)
    .addField("Node Version", process.version, true)
    .addField("NPM Version", npmv.data.replace("\n", ""), true)
    .addField("Bot Version", config.version + " (Build v272)", true)
    .addField('OS', `${os.platform()} (${process.arch})`, true)
    .setColor(0xf47442)
    .setTimestamp();
    message.channel.send({ embed: stats })  
};
    
    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: 0
    };
    
    exports.help = {
      name: "botinfo",
      description: "Provides some information about this bot.",
      usage: "",
      category: "Information"
    };