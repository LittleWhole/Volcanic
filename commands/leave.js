exports.run = async (client, message, command, args, perms, config) => {
    let thisConnection = client.voice.connections.find(connection => connection.channel.guild === message.guild)
    thisConnection.dispatcher.destroy();
    thisConnection.disconnect();
    message.reply("Succesfully disconnected from the channel.");
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "leave",
    description: "Leaves the voice channel.",
    usage: "",
    category: "Music"
};
