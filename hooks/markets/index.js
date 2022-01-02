const uniswapV2Price = require('../../skills/uniswapV2Price')
const defaults = require('../../core/defaults')
const mexcTicker = require('../../skills/mexcTicker')
const poloniexTicker = require('../../skills/poloniexTicker')
const prettifyNumber = require('../../core/prettifyNumber')
const gateioTicker = require('../../skills/gateioTicker')

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

				const mexcMarket = {
					'eth': {
						'usdt': await mexcTicker('ETH_USDT'),
					},
					'vader': {
						'usdt': await mexcTicker('VADER_USDT'),
					},
					'dai': {
						'usdt': await mexcTicker('DAI_USDT'),
					}
				}

				const poloniexMarket = {
					'eth': {
						'usdt': await poloniexTicker('USDT_ETH'),
					},
					'vader': {
						'usdt': await poloniexTicker('USDT_VADER'),
					},
					'usdt': {
						'dai': await poloniexTicker('USDT_DAI')
					}
				}

				const gateioMarket = {
					'vader': {
						'usdt': await gateioTicker('VADER_USDT'),
						'eth': await gateioTicker('VADER_ETH'),
					},
					'dai': {
						'usdt': await gateioTicker('DAI_USDT'),
					},
				}

				switch (exchange) {
					case 'uniswap': announce = `<:uniswap:718587420274196553> Uniswap V2 **$VADER** price is at *USDC* **${uniswapV2Market.vader.usdc}**, *DAI* **${uniswapV2Market.vader.dai}**, *Ξ* **${uniswapV2Market.vader.weth}**`; break
					case 'mexc': announce = `<:mxc:917129131244789781> MEXC Global **$VADER** price is at *USDT* **${await prettifyNumber(mexcMarket?.vader.usdt.data?.[0]?.last, 0, 5)}**, *DAI* **${await prettifyNumber((Number(mexcMarket?.vader.usdt.data?.[0]?.last) * Number(mexcMarket?.dai.usdt.data?.[0]?.last)), 0, 5)}**, *Ξ* **${await prettifyNumber((Number(mexcMarket?.vader.usdt.data?.[0]?.last) / Number(mexcMarket?.eth.usdt.data?.[0]?.last)), 0, 9)}**`; break
					case 'gateio': announce = `<:gate:925868452705599528> Gate.io **$VADER** price is at *USDT* **${await prettifyNumber(gateioMarket.vader.usdt['last'], 0, 5)}**, *DAI* **${await prettifyNumber((Number(gateioMarket.vader.usdt['last']) * Number(gateioMarket.dai.usdt['last'])), 0, 5)}**, *Ξ* **${await prettifyNumber(gateioMarket.vader.eth['last'], 0, 9)}**`; break
					case 'poloniex': announce = `<:poloniex:925869327608070186> Poloniex **$VADER** price is at *USDT* **${await prettifyNumber(poloniexMarket.vader.usdt['last'], 0, 5)}**, *DAI* **${await prettifyNumber((Number(poloniexMarket.vader.usdt['last']) * Number(poloniexMarket.usdt.dai['last'])), 0, 5)}**, *Ξ* **${await prettifyNumber((Number(poloniexMarket.vader.usdt['last']) / Number(poloniexMarket.eth.usdt['last'])), 0, 9)}**`; break
					default: announce = `<:uniswap:718587420274196553> Uniswap V2 **$VADER** price is at *USDC* **${uniswapV2Market.vader.usdc}**, *DAI* **${uniswapV2Market.vader.dai}**, *Ξ* **${uniswapV2Market.vader.weth}**
<:mxc:917129131244789781> MEXC Global **$VADER** price is at *USDT* **${await prettifyNumber(mexcMarket?.vader.usdt.data?.[0]?.last, 0, 5)}**, *DAI* **${await prettifyNumber(Number(Number(mexcMarket?.vader.usdt.data?.[0]?.last) * Number(mexcMarket?.dai.usdt.data?.[0]?.last)), 0, 5)}**, *Ξ* **${await prettifyNumber((Number(mexcMarket?.vader.usdt.data?.[0]?.last) / Number(mexcMarket?.eth.usdt.data?.[0]?.last)), 0, 9)}**
<:poloniex:925869327608070186> Poloniex **$VADER** price is at *USDT* **${await prettifyNumber(poloniexMarket.vader.usdt['last'], 0, 5)}**, *DAI* **${await prettifyNumber((Number(poloniexMarket.vader.usdt['last']) * Number(poloniexMarket.usdt.dai['last'])), 0, 5)}**, *Ξ* **${await prettifyNumber((Number(poloniexMarket.vader.usdt['last']) / Number(poloniexMarket.eth.usdt['last'])), 0, 9)}**
<:gate:925868452705599528> Gate.io **$VADER** price is at *USDT* **${await prettifyNumber(gateioMarket.vader.usdt['last'], 0, 5)}**, *DAI* **${await prettifyNumber((Number(gateioMarket.vader.usdt['last']) * Number(gateioMarket.dai.usdt['last'])), 0, 5)}**, *Ξ* **${await prettifyNumber(gateioMarket.vader.eth['last'], 0, 9)}**`
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
						case '!uniswap': sendPriceToChannel(message, 'uniswap'); break
						case '!poloniex': sendPriceToChannel(message, 'poloniex'); break
						case '!mexc': sendPriceToChannel(message, 'mexc')
					}
				}
				else {
					switch (message.content) {
						case '!price': sendPriceToChannel(message); break
						case '!uniswap': sendPriceToChannel(message, 'uniswap'); break
						case '!poloniex': sendPriceToChannel(message, 'poloniex'); break
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