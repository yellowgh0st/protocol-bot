const fs = require('fs')
const path = require('path')

module.exports = {
	priority: 0,
	init: async (client) => {

		const sendTheHeartOfVader = async (message) => {
			try {
					const txt = fs.readFileSync(path.join(__dirname, '../../memories/txt/wen1s'), 'utf-8')
					const quotes = txt.split('\n')
					const t = Math.floor(Math.random() * quotes.length)

					const files = [
						'https://raw.githubusercontent.com/yellowgh0st/protocol-bot/main/memories/jpg/FFPMoRWVkAEBa65.jpg',
						'https://raw.githubusercontent.com/yellowgh0st/protocol-bot/main/memories/jpg/202111289.jpg',
					]
					const p = Math.floor(Math.random() * files.length)

					await message.channel.send(`**${quotes[t]}**`, {
						files: [ files[p] ],
					})

			}
			catch (err) {
				console.log(err)
			}
		}
	
		try {
			client.on('message', (message) => {
				switch (message.content) {
					case '!wen1$': sendTheHeartOfVader(message)
				}
			})
			console.log('TheHearthOfVader hook initiated')
		}
		catch (err) {
			console.log('TheHearthOfVader hook initialization failed')
			console.log(err)
		}
	
	}
}
