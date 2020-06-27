const ytdl = require('ytdl-core')
const search = require('youtube-search');
const ffmpeg = require('ffmpeg-static');
const { MessageEmbed } = require('discord.js');
const format = require('format-duration');

exports.run = async (client, message, command, args, perms, config) => {
    var opts = {
        maxResults: 10,
        key: config.apikeys.google
    };
    if (!message.guild.members.cache.get(message.author.id).voice.channelID) {
        message.reply("You need to be in a voice channel to play music. Join a voice channel first.");
    } else {
        message.guild.channels.cache.get(message.guild.members.cache.get(message.author.id).voice.channelID).join().then(connection => {
            search(args.join(" "), opts, async (err, results) => {
                if(err) return console.log(err);
                const dispatcher = connection.play(ytdl(results[0].link, { quality: 'highestaudio' }));
                dispatcher.on('start', async () => {
                    let info = await ytdl.getBasicInfo(results[0].link);
                    let songEmbed = new MessageEmbed()
                    .setTitle("Now Playing")
                    .setDescription(results[0].title)
                    .addField("Channel", results[0].channelTitle, true)
                    .addField("Length", format(1000 * info.player_response.videoDetails.lengthSeconds), true)
                    .setImage(info.player_response.videoDetails.thumbnail.thumbnails[4].url)
                    .setColor(config.colors.blue)
                    .setFooter("Volcanic by LittleWhole#1337")
                    .setTimestamp();
                    message.channel.send({ embed: songEmbed });
                });
            });
        })
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "play",
    description: "Search for and play music from YouTube.",
    usage: "<search term>",
    category: "Music"
};
