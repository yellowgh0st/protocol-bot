module.exports = {
	priority: 0,
	init: async (client) => {

		const sendRoadMapToChannel = async (message) => {

			const files = [
				'https://raw.githubusercontent.com/yellowgh0st/protocol-bot/main/memories/jpg/map.jpg',
			]

			await message.channel.send(``, {
				files: files,
			})

		}
	
		try {
			client.on('message', (message) => {
				switch (message.content) {
					case '!roadmap': sendRoadMapToChannel(message)
				}
			})
			console.log('RoadMap hook initiated')
		}
		catch (err) {
			console.log('RoadMap hook initialization failed')
			console.log(err)
		}
	
	} 
}