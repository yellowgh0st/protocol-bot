const vaderHolders = require('../../skills/uniswapV2PrincipalPrice')
const defaults = require('../../core/defaults')
const prettifyNumber = require('../../core/prettifyNumber')
const uniswapV2PrincipalPrice = require('../../skills/uniswapV2PrincipalPrice')

module.exports = {
	priority: 0,
	init: async (client) => {
	
		const sendPrincipalPriceToChannel = async (message) => {
			try {
				const price = await uniswapV2PrincipalPrice(defaults.network.address.vaderEthUniV2Pool)
				const announce = `<:uniswap:718587420274196553> Uniswap V2 **$VADER** / **ETH** **LP token** price is at *Ξ* **${prettifyNumber(price?.[0]?.principalPrice, 0, 18)}**`
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
					case '!principal': sendPrincipalPriceToChannel(message)
				}
			})
			console.log('Principal Price hook initiated')
		}
		catch (err) {
			console.log('Principal Price hook initialization failed')
			console.log(err)
		}
	
	}
}