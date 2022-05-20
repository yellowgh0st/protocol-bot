const uniswapV2Price = require('../../skills/uniswapV2Price')
const defaults = require('../../core/defaults')
const vaderCirculating = require('../../skills/vaderCirculating')
const prettifyNumber = require('../../core/prettifyNumber')

module.exports = {
	priority: 0,
	init: async (client) => {

		const sendMcapToChannel = async (message) => {
			try {
				const regExp = /e-(\d+)/
				const uniswapV2Market = {
					'vader': {
						'usdc': (await uniswapV2Price(defaults.network.address.vaderEthUniV2Pool, true) *
							Number(await uniswapV2Price(defaults.network.address.usdcEthUniV2Pool) *
								1000000000000).toFixed(2)).toFixed(6).replace(regExp),
					},
				}
	
				const circulating = await vaderCirculating()
				const mcap = prettifyNumber((circulating * uniswapV2Market.vader.usdc), 0, 2)
				const announce = `<:VADER:976952650618769479> **$VADER** current market capitalization is *USDC* **${mcap}**`
		
				if(announce) {
					await message.channel.send(announce)
				}
			}
			catch (err) {
				console.log(err)
			}
		}
	
		const sendCircToChannel = async (message) => {
			try {
				const circulating = prettifyNumber(await vaderCirculating(), 0, 5)
				const announce = `<:VADER:976952650618769479> **${circulating}** **$VADER** is current circulating supply.`
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