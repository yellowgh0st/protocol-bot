const { ethers } = require('ethers')
const abi = require('../../artifacts/abi/uniswapPairV2')
const defaults = require('../../core/defaults')

 module.exports = async (address) => {
	try {
			const contract = new ethers.Contract(
				address,
				abi,
				defaults.network.provider,
			)
			const data = await contract.getReserves()
			if (data) return data
	}
	catch (err) {
		console.log(err)
	}
}