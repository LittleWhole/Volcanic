exports.run = async (client, message, command, args, perms, config) => {
    let thisConnection = client.voice.connections.find(connection => connection.channel.guild === message.guild)
    thisConnection.dispatcher.pause();
    message.channel.send(":pause_button: **Paused**");
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "pause",
    description: "Pauses the current song.",
    usage: "",
    category: "Music"
};
