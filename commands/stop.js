exports.run = async (client, message, command, args, perms, config) => {
    let thisConnection = client.voice.connections.find(connection => connection.channel.guild === message.guild)
    thisConnection.dispatcher.destroy();
    message.reply("Stopped playing the song.");
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "stop",
    description: "Stops playing music.",
    usage: "",
    category: "Music"
};
