const { ethers } = require('ethers')
const abi = require('../../artifacts/abi/uniswapPairV2')
const defaults = require('../../core/defaults')

 module.exports = async (address, swapBaseAsset = false) => {
	try {
			const contract = new ethers.Contract(
				address,
				abi,
				defaults.network.provider,
			)
			const data = await contract.getReserves()
			if (data) {
				if(swapBaseAsset === true) {
					return (data._reserve1 / data._reserve0)
				}
				else {
					return (data._reserve0 / data._reserve1)
				}
			}
	}
	catch (err) {
		console.log(err)
	}
}