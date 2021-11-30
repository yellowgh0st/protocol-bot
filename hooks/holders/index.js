const vaderCirculating = require('../../skills/vaderCirculating')
const prettifyNumber = require('../../core/prettifyNumber')

module.exports = {
	priority: 0,
	init: async (client) => {
	
		const sendCircToChannel = async (message) => {
			try {
				const holders = await prettifyNumber(await vaderHolders(), 0, 5)
				const announce = `<:vadersymbolwring:914298664741130240> **${circulating}** **holders** of **$VADER** has strong hands.`
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
					case '!mcap': sendMcapToChannel(message); break
					case '!circulation': sendCircToChannel(message); break
					case '!circ': sendCircToChannel(message); break
					case '!marketcap': sendMcapToChannel(message)
				}
			})
			console.log('MarketCap hook initiated')
		}
		catch (err) {
			console.log('MarketCap hook initialization failed')
			console.log(err)
		}
	
	}
}