require('dotenv').config()
const fs = require('fs')
const { Client } = require('discord.js')
const client = new Client()

client.login(process.env.LOGIN_KEY).then(() => {
  console.log(
  `Successfully logged in as: ${client.user.username}#${client.user.discriminator}`,
  )
	client.once('ready', () => {
		for (const name of fs.readdirSync('./hooks')) {
			const hooks = fs
				.readdirSync(`./hooks/${name}`)
				.filter((file) => file.endsWith('.js'))
			for (const index of hooks) {
				const hook = require(`./hooks/${name}/${index}`)
				hook(client)
			}
		}
	})
})