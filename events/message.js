module.exports = async (client, config) => {
  client.on("message", message => {
	  if (!message.content.startsWith(config.prefix)) return;
	  let command = message.content.split(" ")[0].slice(config.prefix.length);
	  let args = message.content.split(" ").slice(1);
	  let perms = client.permissions(message);
	  let cmd;
	  if (client.commands.has(command)) {
	    cmd = client.commands.get(command);
	  } else if (client.aliases.has(command)) {
	    cmd = client.commands.get(client.aliases.get(command));
	  }
	  if (cmd) {
	    if (perms < cmd.conf.permLevel) return message.reply(`You need to be permission level **${cmd.conf.permLevel}** to perform this command.`);
	    cmd.run(client, message, command, args, perms, config);
	  }
  });
};