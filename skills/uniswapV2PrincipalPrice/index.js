const defaults = require('../../core/defaults')
const queryGraphQL = require('../../core/queryGraphQL')
// const { utils } = require('ethers')

 module.exports = async (pairAddress) => {
	const query = `
	query {
		pairs (
			where: {
				id: "${String(pairAddress).toLowerCase()}"
			}
			) {
				token0Price
				token1Price
				reserve0
				reserve1
				totalSupply
			}
	}`

	try {
		const data = await queryGraphQL(query, defaults.api.uniswapV2Uri)
		const tvl = Number((data?.pairs?.[0]?.reserve0) * (data?.pairs?.[0]?.token1Price)) + Number(data?.pairs?.[0]?.reserve1)
		const price = Number((tvl) / (data?.pairs?.[0]?.totalSupply))
		return [price && tvl ? {
			totalValueLocked: tvl,
			principalPrice: price,
		} : undefined]
	}
	catch (err) {
		console.log(err)
	}
}