require('dotenv').config()
const { ethers } = require('ethers')

module.exports = {
	bot: {
		versionPreFix: 'alpha',
		version: '0.1',
		versionSuffix: 'c',
	},
	network: {
		provider: new ethers.providers.FallbackProvider(
			[
				{
					provider: new ethers.providers.AlchemyProvider(
						Number(process.env.CHAIN_ID),
						process.env.ALCHEMY_KEY,
					),
					weight: 1,
					priority: 1,
					stallTimeout: 2000,
				},
			],
		),
		address: {
			vader: '0x2602278ee1882889b946eb11dc0e810075650983',
			xvader: '0x665ff8faa06986bd6f1802fa6c1d2e7d780a7369',
			usdv: '0xea3fb6f331735252e7bfb0b24b3b761301293dbe',
			usdcEthUniV2Pool: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
			daiEthUniV2Pool: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
			vaderEthUniV2Pool: '0x452c60e1e3ae0965cd27db1c7b3a525d197ca0aa',
			usdv3crvf: '0x7abD51BbA7f9F6Ae87aC77e1eA1C5783adA56e5c',
			crv3pool: '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7',
		},
	},
	api: {
		// ttl in seconds
		ttl: 120,
		theGraphUri: 'https://api.thegraph.com/subgraphs/name/satoshi-naoki/vader-protocol-mainnet',
		uniswapV2Uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
	},
}