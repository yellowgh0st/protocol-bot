const defaults = require('../../core/defaults')
const queryGraphQL = require('../../core/queryGraphQL')

 module.exports = async (address) => {
	const query = `
		{
			global(id: "UniqueWallet_${address}") {
				value
			}
		}
	`
	try {
		const result = await queryGraphQL(query, defaults.api.theGraphUri)
		if (result) {
			return result?.global?.value
		}
	}
	catch (err) {
		console.log(err)
	}
}