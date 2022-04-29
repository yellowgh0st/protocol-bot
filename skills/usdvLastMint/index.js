const defaults = require('../../core/defaults')
const queryGraphQL = require('../../core/queryGraphQL')

 module.exports = async () => {
	const query = `
		query {
			usdvMints(first: 1, orderBy: timestamp, orderDirection: desc) {
				vAmount
				uAmountMinOut
				uAmount
				timestamp
			}
		}
	`
	try {
		const result = await queryGraphQL(query, defaults.api.usdvUri)
		if (result) {
			return result.usdvMints[0];
		}
	}
	catch (err) {
		console.log(err)
	}
}