const Discord = require('discord.js');
const mathjs = require('mathjs');
const d3 = require('d3');
const sd = require('standard-deviation');
const arr = {	
	max: function(array) {
		return Math.max.apply(null, array);
	},
	
	min: function(array) {
		return Math.min.apply(null, array);
	},
	
	range: function(array) {
		return arr.max(array) - arr.min(array);
	},
	
	midrange: function(array) {
		return arr.range(array) / 2;
	},

	sum: function(array) {
		var num = 0;
		for (var i = 0, l = array.length; i < l; i++) num += array[i];
		return num;
	},
	
	mean: function(array) {
		return arr.sum(array) / array.length;
	},
	
	median: function(array) {
		array.sort(function(a, b) {
			return a - b;
		});
		var mid = array.length / 2;
		return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
	},
	
	modes: function(array) {
		if (!array.length) return [];
		var modeMap = {},
			maxCount = 0,
			modes = [];

		array.forEach(function(val) {
			if (!modeMap[val]) modeMap[val] = 1;
			else modeMap[val]++;

			if (modeMap[val] > maxCount) {
				modes = [val];
				maxCount = modeMap[val];
			}
			else if (modeMap[val] === maxCount) {
				modes.push(val);
				maxCount = modeMap[val];
			}
		});
		return modes;
	},
	
	variance: function(array) {
		var mean = arr.mean(array);
		return arr.mean(array.map(function(num) {
			return Math.pow(num - mean, 2);
		}));
	},
	
	standardDeviation: function(array) {
		return Math.sqrt(arr.variance(array));
	},
	
	meanAbsoluteDeviation: function(array) {
		var mean = arr.mean(array);
		return arr.mean(array.map(function(num) {
			return Math.abs(num - mean);
		}));
	},
	
	zScores: function(array) {
		var mean = arr.mean(array);
		var standardDeviation = arr.standardDeviation(array);
		return array.map(function(num) {
			return (num - mean) / standardDeviation;
		});
	},

	iqr(data) {
		return d3.quantile(data, 0.75) - d3.quantile(data, 0.25);
	}
};

exports.run = async (client, message, command, args, perms, config) => {
    // if (/^\d+\.\d+$/.test(args.join().replace(/,/g, "")) !== true) return message.reply("Only numbers are permitted in data sets!");
    const data = args.join().replace(/\s/g, "").split(",");
    let messageEmbed = new Discord.MessageEmbed()
    .setTitle("Statistics for Data Set")
    .addField("Data Set Provided", data.join(", "))
    .addField("Length", data.length, true)
    .addField("Sum of Data Set", mathjs.sum(data))
    .addField("Lower Extreme", arr.min(data), true)
    .addField("Upper Extreme", arr.max(data), true)
	.addField("Quartile 1", d3.quantile(data, 0.25), true)
	.addField("Median", mathjs.median(data), true)
	.addField("Quartile 3", d3.quantile(data, 0.75), true)
	.addField("Mode(s)", arr.modes(data).join(", "), true)
    .addField("Mean", mathjs.mean(data), true)
	.addField("Range", arr.range(data), true)
	.addField("Interquartile Range", arr.iqr(data), true)
    .addField("Standard Deviation", d3.deviation(data), true)
    .setColor(config.color)
    .setTimestamp();

    message.channel.send({ embed: messageEmbed });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "data",
    description: "Calculate statistics from a data set.",
    usage: "<data set seperated by commas \",\">",
    category: "Math"
}