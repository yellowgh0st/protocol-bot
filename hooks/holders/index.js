const vaderHolders = require('../../skills/vaderHolders')
const defaults = require('../../core/defaults')
const prettifyNumber = require('../../core/prettifyNumber')

module.exports = {
	priority: 0,
	init: async (client) => {
	
		const sendHoldersToChannel = async (message) => {
			try {
				const vader = !await vaderHolders(defaults.network.address.vader) ? '0' : await vaderHolders(defaults.network.address.vader)
				const xvader = !await vaderHolders(defaults.network.address.xvader) ? '0' : await vaderHolders(defaults.network.address.xvader)
				const usdv = !await vaderHolders(defaults.network.address.usdv) ? '0' : await vaderHolders(defaults.network.address.usdv)
				const total = !prettifyNumber(Number(xvader) + Number(vader) + Number(usdv), 0, 0) ? '0' : prettifyNumber(Number(xvader) + Number(vader), 0, 0)
				const announce = `<:VADER:976952650618769479> **${prettifyNumber(vader, 0, 0)}** **holders** of **$VADER** have strong hands.\n<:xVADER:976952714225410109> **${prettifyNumber(xvader, 0, 0)}** **holders** of **$xVADER** are earning extra.\n<:USDV:976952697636929596> **${prettifyNumber(usdv, 0, 0)}** **holders** of **$USDV** keep their bag.\nIn total it's **${total}** of holders.`
				if(announce) {
					await message.channel.send(announce)
				}
			}
			catch (err) {
				console.log(err)
			}
		}
	
		try {
			client.on('message', (message) => {
				switch (message.content) {
					case '!holders': sendHoldersToChannel(message); break
					case '!hands': sendHoldersToChannel(message)
				}
			})
			console.log('Holders hook initiated')
		}
		catch (err) {
			console.log('Holders hook initialization failed')
			console.log(err)
		}
	
	}
}