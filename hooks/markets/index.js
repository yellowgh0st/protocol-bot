/* eslint-disable no-unused-vars */
const uniswapV2Price = require('../../skills/uniswapV2Price')
const defaults = require('../../core/defaults')
const mexcTicker = require('../../skills/mexcTicker')
const prettifyNumber = require('../../core/prettifyNumber')

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

				const mexcMarket = await mexcTicker('VADER_USDT')
		
				switch (exchange) {
					case 'uniswap': announce = `<:uniswap:718587420274196553> Uniswap V2 **$VADER** price is at *USDC* **${uniswapV2Market.vader.usdc}**, *DAI* **${uniswapV2Market.vader.dai}**, *Ξ* **${uniswapV2Market.vader.weth}**`; break
					case 'mexc': announce = `<:mxc:917129131244789781> MEXC Global **$VADER** price is at *USDT* **${await prettifyNumber(mexcMarket?.data?.[0]?.last, 0, 6)}**`; break
					default: announce = `<:uniswap:718587420274196553> Uniswap V2 **$VADER** price is at *USDC* **${uniswapV2Market.vader.usdc}**, *DAI* **${uniswapV2Market.vader.dai}**, *Ξ* **${uniswapV2Market.vader.weth}**\n<:mxc:917129131244789781> MEXC Global **$VADER** price is at *USDT* **${await prettifyNumber(mexcMarket?.data?.[0]?.last, 0, 6)}**`
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
				if (message.channel.id === '914269877848637451') {
					switch (message.content) {
						case '.': sendPriceToChannel(message); break
						case '!price': sendPriceToChannel(message); break
						case '!uniswap': sendPriceToChannel(message, 'uniswap'); break
						case '!mexc': sendPriceToChannel(message, 'mexc')
					}
				}
				else {
					switch (message.content) {
						case '!price': sendPriceToChannel(message); break
						case '!uniswap': sendPriceToChannel(message, 'uniswap'); break
						case '!mexc': sendPriceToChannel(message, 'mexc')
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