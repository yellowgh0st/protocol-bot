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
			usdcEthUniV2Pool: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
			daiEthUniV2Pool: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
			vaderEthUniV2Pool: '0x452c60e1e3ae0965cd27db1c7b3a525d197ca0aa',
		},
	},
	api: {
		theGraphUri: 'https://api.thegraph.com/subgraphs/name/satoshi-naoki/vader-protocol-mainnet',
	},
}