module.exports = async (client) => {
		const channel = client.channels.cache.find(c => c.name === 'bot')
		if (channel) {
			channel.send(
				`Hey, my name is ${client.user.username} - Protocol Bot version a0.1. I am now ready!`,
			)
		}
		console.log(
      `Hey, my name is ${client.user.username} - Protocol Bot version a0.1. I am now ready!`,
    )
}