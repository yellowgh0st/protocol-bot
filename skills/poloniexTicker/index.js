const { default: cachios } = require('cachios')
const defaults = require('../../core/defaults')

 module.exports = async (ticker = undefined) => {
	try {
			const get = await cachios.get('https://poloniex.com/public?command=returnTicker', {
				ttl: defaults.api.ttl,
			})
			if (ticker) {
				if (get.data[ticker]) return get.data[ticker]
			}
			else {
				if (get.data) return get.data
			}
		}
		catch (err) {
			console.log(err)
		}
}