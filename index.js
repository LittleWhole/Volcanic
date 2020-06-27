// Discord
const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true });

const config = require("./config.json");
const fs = require("fs");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, client.help.name);
    });
  });
});
fs.readdir("./events/", (err, evtFiles) => {
  if (err) console.error(err);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    event(client, config);
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.on("error", console.error);
client.on("warn", console.warn);

client.login(config.token);

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });

      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.permissions = (message, override) => {
  if (override) return override;
  let permlvl;
  if (permlvl >= 10) return permlvl;
  permlvl = 0; // Member
  if (message.member.hasPermission('MANAGE_MESSAGES')) permlvl = 1; // Chat Moderator
  if (message.member.hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS'])) permlvl = 2; // Permissions Moderator
  if (message.member.hasPermission('MANAGE_ROLES')) permlvl = 3; // Moderator
  if (message.member.hasPermission('MANAGE_SERVER')) permlvl = 4; // Manager
  if (message.member.hasPermission('ADMINISTRATOR')) permlvl = 5; // Admin
  if (message.author.id === message.guild.ownerID) permlvl = 6; // Guild Owner
  if (message.author.id === undefined) permlvl = 7; // Reserved
  if (message.author.id === Infinity) permlvl = 8; // Retrace
  if (message.author.id === "184767752479834113" || message.author.id === "229016449593769984") permlvl = 9; // FrostTaco / Goseale
  if (message.author.id === "230880116035551233") permlvl = 10; // Developer
  if (1 === 2) permlvl = 11; // secret
  return permlvl;
};
