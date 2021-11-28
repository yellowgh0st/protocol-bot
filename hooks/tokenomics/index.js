module.exports = {
	priority: 0,
	init: async (client) => {
		const sendTokenomics = async (message) => {
			try {
					const files = [
						'https://raw.githubusercontent.com/yellowgh0st/protocol-bot/main/memories/png/P4DAvNPIzRHqe5C6Nsaew.png',
					]
					await message.channel.send(``, {
						files: files,
					})

			}
			catch (err) {
				console.log(err)
			}
		}
	
		try {
			client.on('message', (message) => {
				switch (message.content) {
					case '!tokenomics': sendTokenomics(message)
				}
			})
			console.log('Tokenomics hook initiated')
		}
		catch (err) {
			console.log('Tokenomics hook initialization failed')
			console.log(err)
		}
	}
}
