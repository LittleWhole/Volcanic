const childProcess = require('child_process');

exports.run = async (client, message, command, args, perms, config) => {
 //   if (!config.owner.contains(message.author.id) && message.author.id !== "184767752479834113") return message.reply("No permission!");
          function encode_utf8(s) {
                    return unescape(encodeURIComponent(s));
                }
      
                function decode_utf8(s) {
                    return decodeURIComponent(escape(s));
                }
      
                const clear = text => {
                    if (typeof(text) === "string")
                      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                    else
                        return text;
          }
          let msg = await message.channel.send("Executing...");
            try {
      
              const code = args.join(" ");
              let evaled = childProcess.execSync(encode_utf8(code));
      
              console.log(typeof evaled)
              console.log(evaled)
      
              if (typeof evaled !== "string")
              evaled = evaled.toString();
      
              if (evaled.length >= 2000) {
                message.reply(`Output was longer than 2000 characters (${evaled.length} to be exact!) You can find it in the console.`);
                return console.log(evaled);
              }
      
              msg.edit(`**Bash execution successful.**\n\n:inbox_tray: Input:\n\`\`\`sh\nlittlewhole@littlewhole-pc:~$ ${code}\n\`\`\`\n\n:outbox_tray: Output:\n\`\`\`sh\n${clear(evaled.replace(config.token, "[TOKEN]"))}\n\`\`\`\n\`Execution Completed\``);
      
            } catch (err) {
              msg.edit(`\`Bash ERROR\` \`\`\`sh\n${clear(err)}\n\`\`\``);
          }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 9
}

exports.help = {
    name: "bash",
    description: "Execute raw bash commands.",
    usage: "<command>",
    category: "Developer"
}