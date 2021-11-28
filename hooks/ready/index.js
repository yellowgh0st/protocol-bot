const defaults = require("../../core/defaults")

module.exports = {
	priority: 1,
	init: async (client) => {
		const channel = client.channels.cache.find(c => c.name === 'bot')
		if (channel) {
			channel.send(
				`Hey, my name is ${client.user.username} - Protocol Bot version ${defaults.bot.versionPreFix}${defaults.bot.version}${defaults.bot.versionSuffix}. Process initiated!`,
			)
		}
		console.log(
			`Hey, my name is ${client.user.username} - Protocol Bot version ${defaults.bot.versionPreFix}${defaults.bot.version}${defaults.bot.versionSuffix}. Process initiated!`,
		)
	}
}