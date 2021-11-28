const fs = require('fs')
const path = require('path')

module.exports = async (client) => {

	const sendTheHeartOfVader = async (message) => {
		try {
				const txt = fs.readFileSync(path.join(__dirname, '../../memories/txt/wen1s'), 'utf-8')
				const quotes = txt.split('\n')
				const n = Math.floor(Math.random() * quotes.length)
				await message.channel.send(`**${quotes[n]}**`, {
					files: [
						'https://raw.githubusercontent.com/yellowgh0st/protocol-bot/main/memories/jpg/FFPMoRWVkAEBa65.jpg'
					]
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
