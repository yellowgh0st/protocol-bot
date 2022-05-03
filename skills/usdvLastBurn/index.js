const defaults = require('../../core/defaults')
const queryGraphQL = require('../../core/queryGraphQL')

 module.exports = async () => {
	const query = `
		query {
			usdvBurns(first: 1, orderBy: timestamp, orderDirection: desc) {
				uAmount
				vAmountMinOut
				vAmount
				timestamp
			}
		}
	`
	try {
		const result = await queryGraphQL(query, defaults.api.usdvUri)
		if (result) {
			return result.usdvBurns[0];
		}
	}
	catch (err) {
		console.log(err)
	}
}