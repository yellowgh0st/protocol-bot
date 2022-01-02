const { default: cachios } = require('cachios')
const defaults = require('../../core/defaults')

 module.exports = async (ticker = undefined) => {
	try {
			const get = await cachios.get(
				`https://api.gateio.ws/api/v4/spot/tickers${ticker ? `?currency_pair=${ticker}` : ''}`,
			{
				ttl: defaults.api.ttl,
			})
			if (get.data[0]) return get.data[0]
		}
		catch (err) {
			console.log(err)
		}
}