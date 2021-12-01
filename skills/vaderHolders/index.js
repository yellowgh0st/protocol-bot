const defaults = require('../../core/defaults')
const queryGraphQL = require('../../core/queryGraphQL')

 module.exports = async () => {
	const query = `
		{
			global(id: "UniqueWallet_${defaults.network.address.vader}") {
				value
			}
		}
	`
	try {
		const result = await queryGraphQL(query, defaults.api.theGraphUri)
		if (result) {
			return result.global.value
		}
	}
	catch (err) {
		console.log(err)
	}
}