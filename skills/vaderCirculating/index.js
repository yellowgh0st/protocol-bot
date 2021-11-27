const defaults = require('../../core/defaults')
const queryGraphQL = require('../../core/queryGraphQL')
const { utils } = require('ethers')

 module.exports = async () => {
	const query = `
		query {
			global(id: "circulatingSupply") {
				value
			}
		}
	`
	try {
		const result = await queryGraphQL(query, defaults.api.theGraphUri)
		if (result) {
			return utils.formatUnits(result.global.value, 18)
		}
	}
	catch (err) {
		console.log(err)
	}
}