require('dotenv').config()
const { Client } = require('discord.js')
const client = new Client()
const hooksBuffer = require('./core/hooksBuffer')

client.login(process.env.LOGIN_KEY).then(() => {
  console.log(
  `Successfully logged in as: ${client.user.username}#${client.user.discriminator}`,
  )
	client.once('ready', () => {
		hooksBuffer((buffer) => {
			buffer.forEach((hook) => hook.init(client))
		})
	})
})