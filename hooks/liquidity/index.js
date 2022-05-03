const uniswapV2Price = require('../../skills/uniswapV2Price')
const defaults = require('../../core/defaults')
const uniswapV2Reserves = require('../../skills/uniswapV2Reserves')
const prettifyNumber = require('../../core/prettifyNumber')
const { utils } = require('ethers')

module.exports = {
	priority: 0,
	init: async (client) => {

		const sendLiquidityToChannel = async (message) => {
			try {
				const regExp = /e-(\d+)/
				const uniswapV2Market = {
					'weth': {
						'usdc': Number(await uniswapV2Price(defaults.network.address.usdcEthUniV2Pool) * 1000000000000).toFixed(2),
						'dai': Number(await uniswapV2Price(defaults.network.address.daiEthUniV2Pool)).toFixed(2),
					},
					'vader': {
						'usdc': (await uniswapV2Price(defaults.network.address.vaderEthUniV2Pool, true) *
							Number(await uniswapV2Price(defaults.network.address.usdcEthUniV2Pool) *
								1000000000000).toFixed(2)).toFixed(6).replace(regExp),
					},
				}

				const data = await uniswapV2Reserves(defaults.network.address.vaderEthUniV2Pool)
				const r0 = utils.formatUnits(data[0], 18)
				const r1 = utils.formatUnits(data[1], 18)
				const t = (Number(r0) * Number(uniswapV2Market.vader.usdc) + (Number(r1) * Number(uniswapV2Market.weth.usdc)))

				const announce = `
				<:uniswap:718587420274196553> Uniswap V2 pool *$VADER* **${prettifyNumber(r0, 0, 5)}** *Ξ* **${prettifyNumber(r1, 0, 5)}** has total **$${prettifyNumber(t, 0, 2)}**
				`

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
					case '!liquidity': sendLiquidityToChannel(message); break
					case '!liq': sendLiquidityToChannel(message)
				}
			})
			console.log('Liquidity hook initiated')
		}
		catch (err) {
			console.log('Liquidity hook initialization failed')
			console.log(err)
		}
	
	}
}