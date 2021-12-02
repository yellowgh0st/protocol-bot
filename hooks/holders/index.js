const vaderHolders = require('../../skills/vaderHolders')
const defaults = require('../../core/defaults')
const prettifyNumber = require('../../core/prettifyNumber')

module.exports = {
	priority: 0,
	init: async (client) => {
	
		const sendHoldersToChannel = async (message) => {
			try {
				const vader = !(await prettifyNumber(await vaderHolders(defaults.network.address.vader), 0, 0)) ? '0' : await prettifyNumber(await vaderHolders(defaults.network.address.vader), 0, 0)
				const xvader = !(await prettifyNumber(await vaderHolders(defaults.network.address.xvader), 0, 0)) ? '0' : await prettifyNumber(await vaderHolders(defaults.network.address.xvader), 0, 0)
				const announce = `<:vadersymbolwring:914298664741130240> **${vader}** **holders** of **$VADER** have strong hands.\n<:xvadersymbolwring:915963976892944464> **${xvader}** **holders** of **$xVADER** are earning extra.`
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