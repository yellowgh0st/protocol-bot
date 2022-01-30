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
				const total = !await prettifyNumber(Number(xvader) + Number(vader) + Number(usdv), 0, 0) ? '0' : await prettifyNumber(Number(xvader) + Number(vader), 0, 0)
				const announce = `<:vadersymbolwring:914298664741130240> **${await prettifyNumber(vader, 0, 0)}** **holders** of **$VADER** have strong hands.\n<:xvadersymbolwring:915963976892944464> **${await prettifyNumber(xvader, 0, 0)}** **holders** of **$xVADER** are earning extra.\n<:usdvsymbolwring:914298664942465084> **${await prettifyNumber(usdv, 0, 0)}** **holders** of **$USDV** keep their bag.\nIn total it's **${total}** of holders.`
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