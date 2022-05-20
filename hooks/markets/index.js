const uniswapV2Price = require('../../skills/uniswapV2Price')
const defaults = require('../../core/defaults')
const mexcTicker = require('../../skills/mexcTicker')
const poloniexTicker = require('../../skills/poloniexTicker')
const getDy = require('../../skills/getDy')
const getVirtualPrice = require('../../skills/getVirtualPrice')
const prettifyNumber = require('../../core/prettifyNumber')
const gateioTicker = require('../../skills/gateioTicker')
const ethers = require('ethers')

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

				const usdv3crvfPrice = await getDy(0, 1, ethers.utils.parseEther('1'), defaults.network.address.usdv3crvf)
				const crv3poolPrice = await getVirtualPrice(defaults.network.address.crv3pool)
				const usdvPrice = ethers.utils.formatEther(String(Number(usdv3crvfPrice?.toString() / 1e18) * Number(crv3poolPrice?.toString())))

				switch (exchange) {
					case 'uniswap': announce = `<:uniswap:718587420274196553> Uniswap V2 **$VADER** price is at *USDC* **${uniswapV2Market.vader.usdc}**, *DAI* **${uniswapV2Market.vader.dai}**, *Ξ* **${uniswapV2Market.vader.weth}**`; break
					case 'mexc': announce = `<:mxc:917129131244789781> MEXC Global **$VADER** price is at *USDT* **${prettifyNumber(mexcMarket?.vader.usdt.data?.[0]?.last, 0, 5)}**, *DAI* **${prettifyNumber((Number(mexcMarket?.vader.usdt.data?.[0]?.last) * Number(mexcMarket?.dai.usdt.data?.[0]?.last)), 0, 5)}**, *Ξ* **${prettifyNumber((Number(mexcMarket?.vader.usdt.data?.[0]?.last) / Number(mexcMarket?.eth.usdt.data?.[0]?.last)), 0, 9)}**`; break
					case 'gateio': announce = `<:gate:925868452705599528> Gate.io **$VADER** price is at *USDT* **${prettifyNumber(gateioMarket.vader.usdt['last'], 0, 5)}**, *DAI* **${prettifyNumber((Number(gateioMarket.vader.usdt['last']) * Number(gateioMarket.dai.usdt['last'])), 0, 5)}**, *Ξ* **${prettifyNumber(gateioMarket.vader.eth['last'], 0, 9)}**`; break
					case 'poloniex': announce = `<:poloniex:925869327608070186> Poloniex **$VADER** price is at *USDT* **${prettifyNumber(poloniexMarket.vader.usdt['last'], 0, 5)}**, *DAI* **${prettifyNumber((Number(poloniexMarket.vader.usdt['last']) * Number(poloniexMarket.usdt.dai['last'])), 0, 5)}**, *Ξ* **${prettifyNumber((Number(poloniexMarket.vader.usdt['last']) / Number(poloniexMarket.eth.usdt['last'])), 0, 9)}**`; break
					case 'peg': announce = `<:USDV:976952697636929596> **$USDV** rate is at $**${prettifyNumber(usdvPrice, 0, 5)}**`; break
					default: announce = `<:uniswap:718587420274196553> Uniswap V2 **$VADER** price is at *USDC* **${uniswapV2Market.vader.usdc}**, *DAI* **${uniswapV2Market.vader.dai}**, *Ξ* **${uniswapV2Market.vader.weth}**
<:mxc:917129131244789781> MEXC Global **$VADER** price is at *USDT* **${prettifyNumber(mexcMarket?.vader.usdt.data?.[0]?.last, 0, 5)}**, *DAI* **${prettifyNumber(Number(Number(mexcMarket?.vader.usdt.data?.[0]?.last) * Number(mexcMarket?.dai.usdt.data?.[0]?.last)), 0, 5)}**, *Ξ* **${prettifyNumber((Number(mexcMarket?.vader.usdt.data?.[0]?.last) / Number(mexcMarket?.eth.usdt.data?.[0]?.last)), 0, 9)}**
<:gate:925868452705599528> Gate.io **$VADER** price is at *USDT* **${prettifyNumber(gateioMarket.vader.usdt['last'], 0, 5)}**, *DAI* **${prettifyNumber((Number(gateioMarket.vader.usdt['last']) * Number(gateioMarket.dai.usdt['last'])), 0, 5)}**, *Ξ* **${prettifyNumber(gateioMarket.vader.eth['last'], 0, 9)}**
<:USDV:976952697636929596> **$USDV** rate is at $**${prettifyNumber(usdvPrice, 0, 5)}**`
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
						case '!poloniex': sendPriceToChannel(message, 'poloniex'); break
						case '!mexc': sendPriceToChannel(message, 'mexc'); break
						case '!gateio': sendPriceToChannel(message, 'gateio'); break
						case '!peg': sendPriceToChannel(message, 'peg')
					}
				}
				else if (message.channel.id === '913708840464293938') {
						// do nothing
				}
				else {
					switch (message.content) {
						case '!price': sendPriceToChannel(message); break
						case '!uniswap': sendPriceToChannel(message, 'uniswap'); break
						case '!poloniex': sendPriceToChannel(message, 'poloniex'); break
						case '!mexc': sendPriceToChannel(message, 'mexc'); break
						case '!gateio': sendPriceToChannel(message, 'gateio'); break
						case '!peg': sendPriceToChannel(message, 'peg')
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