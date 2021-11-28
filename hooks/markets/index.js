/* eslint-disable no-unused-vars */
const uniswapV2Price = require('../../skills/uniswapV2Price')
const defaults = require('../../core/defaults')

module.exports = {
	priority: 0,
	init: async (client) => {

		const sendPriceToChannel = async (message, exchange) => {
			try {
	
				let announce
				const regExp = /e-(\d+)/
	
				const uniswapV2Market = {
					'weth': {
						'usdc': Number(await uniswapV2Price(defaults.network.address.usdcEthUniV2Pool) * 1000000000000).toFixed(2),
						'dai': Number(await uniswapV2Price(defaults.network.address.daiEthUniV2Pool)).toFixed(2),
					},
					'vader': {
						'weth': (await uniswapV2Price(defaults.network.address.vaderEthUniV2Pool, true)).toFixed(10),
						'usdc': (await uniswapV2Price(defaults.network.address.vaderEthUniV2Pool, true) *
							Number(await uniswapV2Price(defaults.network.address.usdcEthUniV2Pool) *
								1000000000000).toFixed(2)).toFixed(6).replace(regExp),
						'dai': (await uniswapV2Price(defaults.network.address.vaderEthUniV2Pool, true) *
						Number(await uniswapV2Price(defaults.network.address.daiEthUniV2Pool)).toFixed(2)).toFixed(6).replace(regExp),
					},
				}
		
				switch (exchange) {
					case 'uniswap': announce = `<:uniswap:718587420274196553> Uniswap V2 **$VADER** price is at *USDC* **${uniswapV2Market.vader.usdc}**, *DAI* **${uniswapV2Market.vader.dai}**, *Ξ* **${uniswapV2Market.vader.weth}**`; break
					default: announce = `<:uniswap:718587420274196553> Uniswap V2 **$VADER** price is at *USDC* **${uniswapV2Market.vader.usdc}**, *DAI* **${uniswapV2Market.vader.dai}**, *Ξ* **${uniswapV2Market.vader.weth}**`
				}
		
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
				if (message.channel.name === 'markets') {
					switch (message.content) {
						case '.': sendPriceToChannel(message); break
						case '!price': sendPriceToChannel(message); break
						case '!uniswap': sendPriceToChannel(message, 'uniswap')
					}
				}
				else {
					switch (message.content) {
						case '!price': sendPriceToChannel(message); break
						case '!uniswap': sendPriceToChannel(message, 'uniswap')
					}
				}
			})
			console.log('Markets hook initiated')
		}
		catch (err) {
			console.log('Markets hook initialization failed')
			console.log(err)
		}
	
	}
}