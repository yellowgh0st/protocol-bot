const fs = require('fs')
const path = require('path')

module.exports = async (init) => {
	let buffer = []
	try {
		for (const name of fs.readdirSync(path.join(__dirname, '../../hooks'))) {
			const hooks = fs
				.readdirSync(`${path.join(__dirname, '../../hooks/')}${name}`)
				.filter((file) => file.endsWith('.js'))
			for (const index of hooks) {
				const hook = require(`${path.join(__dirname, '../../hooks/')}${name}/${index}`)
				if(hook.priority && Number(hook.priority) > 0) {
					buffer.splice(hook.priority - 1, 0, hook)
				} else {
					buffer.push(hook)
				}
			}
		}
		init(buffer)
	}
	catch (err) {
		console.log(err)
	}
	finally {
		buffer = []
	}
}