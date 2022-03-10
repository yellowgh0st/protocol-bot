const { ethers } = require('ethers')
const abi = require('../../artifacts/abi/3poolMetaPool')
const defaults = require('../../core/defaults')

 module.exports = async (i, J, dx, address) => {
	try {
		const contract = new ethers.Contract(
			address,
			abi,
			defaults.network.provider,
		)
		const data = await contract.get_dy(i, J, dx)
		if (data) return data
	}
	catch (err) {
		console.log(err)
	}
}