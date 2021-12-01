const vaderHolders = require('../../skills/vaderHolders')
const prettifyNumber = require('../../core/prettifyNumber')

module.exports = {
	priority: 0,
	init: async (client) => {
	
		const sendHoldersToChannel = async (message) => {
			try {
				const holders = await prettifyNumber(await vaderHolders(), 0, 0)
				const announce = `<:vadersymbolwring:914298664741130240> **${holders}** **holders** of **$VADER** have strong hands.`
				if(announce) {
					await message.channel.send(announce)
				}
			}
			catch (err) {
				console.log(err)
			}
		}
	
		try {
			client.on('message', (message) => {
				switch (message.content) {
					case '!holders': sendHoldersToChannel(message); break
					case '!hands': sendHoldersToChannel(message)
				}
			})
			console.log('Holders hook initiated')
		}
		catch (err) {
			console.log('Holders hook initialization failed')
			console.log(err)
		}
	
	}
}