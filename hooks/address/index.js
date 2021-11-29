module.exports = {
	priority: 0,
	init: async (client) => {

		const sendAddressToChannel = async (message) => {
			try {
				const announce = `**0x2602278ee1882889b946eb11dc0e810075650983**\nhttps://etherscan.io/token/0x2602278ee1882889b946eb11dc0e810075650983\nhttps://www.coingecko.com/en/coins/vader-protocol`
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
					case '!address': sendAddressToChannel(message)
				}
			})
			console.log('Address hook initiated')
		}
		catch (err) {
			console.log('Address hook initialization failed')
			console.log(err)
		}
	
	}
}