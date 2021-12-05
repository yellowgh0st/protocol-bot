const { default: axios } = require('axios')

 module.exports = async (symbol) => {
	try {
		const params = {
			symbol: symbol,
		}
		const get = await axios.get('https://www.mexc.com/open/api/v2/market/ticker', { params })
		if (get.data) return get.data
		}
		catch (err) {
			console.log(err)
		}
}