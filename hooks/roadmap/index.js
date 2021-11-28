module.exports = {
	priority: 0,
	init: async (client) => {

		const sendRoadMapToChannel = async (message) => {
			const announce = `<:vaderfire:908728100651675719> /▼皿▼\  **VADER's ROADMAP**  /▼皿▼\<:vaderfire:908728100651675719>\n
	📒 **Q4 2021**:
	📌 Audits Completed
	📌 VADER token listing
	📌 USDV minting and Single Side Staking for USDv and VADER AMM Protocol Launch
	📌 Bond Sales for Long term Protocol Owned Liquidity
	
	📒 **Q1 2022**:
	📌 USDV partnership integrations
	📌 Collateral Debt Leveraged Positions
	📌 Crosschain Deployments
	📌 DAO transition
	📌 Expansion of Asset Pools
	
	📒 **Q2 2022**: 
	📌 Treasury Partnerships
	📌 Sponsored Liquidity Partnerships/IDOs
	📌 Sponsored Bond Sales Partnerships`
	
					await message.channel.send(announce)
		}
	
		try {
			client.on('message', (message) => {
				switch (message.content) {
					case '!roadmap': sendRoadMapToChannel(message)
				}
			})
			console.log('RoadMap hook initiated')
		}
		catch (err) {
			console.log('RoadMap hook initialization failed')
			console.log(err)
		}
	
	} 
}