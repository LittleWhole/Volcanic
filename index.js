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

client.permissions = message => {
  let permlvl = 0;
  if(message.author.id === config.owner) permlvl = 10;
  return permlvl;
};
