const ethers = require('ethers')

module.exports = {
	bot: {
		key: process.env.BOT_LOGIN_KEY,
	},
	network: {
		chainId: Number(process.env.CHAIN_ID),
		provider: new ethers.providers.FallbackProvider(
			[
				{
					provider: new ethers.providers.AlchemyProvider(
						this.network.chainId,
						process.env.REACT_APP_ALCHEMY_KEY,
					),
					weight: 1,
					priority: 1,
					stallTimeout: 2000,
				},
			],
			1,
		),
	},
}
