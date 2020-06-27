exports.run = async (client, message, command, args, perms, config) => {
    let thisConnection = client.voice.connections.find(connection => connection.channel.guild === message.guild)
    thisConnection.dispatcher.resume();
    message.channel.send(":arrow_forward: **Resumed**");
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "resume",
    description: "Resumes playing the paused song.",
    usage: "",
    category: "Music"
};
