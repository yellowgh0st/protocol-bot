const defaults = require("../../core/defaults")
const uniswapV2Price = require('../../skills/uniswapV2Price')

module.exports = {
	priority: 0,
	init: async (client) => {

		const setActivity = (uniswapV2Market) => {
			client.user.setActivity(
				`🪙 $${uniswapV2Market.vader.usdc} | Ξ ${uniswapV2Market.vader.weth}`,
				{ type: 'PLAYING' },
			)
		}

		try {
			setInterval(async () => {
				const regExp = /e-(\d+)/
				const uniswapV2Market = {
					'weth': {
						'usdc': Number(await uniswapV2Price(defaults.network.address.usdcEthUniV2Pool) * 1000000000000).toFixed(2),
						'dai': Number(await uniswapV2Price(defaults.network.address.daiEthUniV2Pool)).toFixed(2),
					},
					'vader': {
						'weth': Number(await uniswapV2Price(defaults.network.address.vaderEthUniV2Pool, true)).toFixed(10),
						'usdc': (await uniswapV2Price(defaults.network.address.vaderEthUniV2Pool, true) *
							Number(await uniswapV2Price(defaults.network.address.usdcEthUniV2Pool) *
								1000000000000).toFixed(2)).toFixed(6).replace(regExp),
						'dai': (await uniswapV2Price(defaults.network.address.vaderEthUniV2Pool, true) *
						Number(await uniswapV2Price(defaults.network.address.daiEthUniV2Pool)).toFixed(2)).toFixed(6).replace(regExp),
					},
				}
				setActivity(uniswapV2Market)
			}, 10000)
			console.log('Activity hook initiated')
		}
		catch (err) {
			console.log(err)
		}
	}
}