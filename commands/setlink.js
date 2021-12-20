module.exports = {
	value: ['link', 'setlink', 'send.link'],
	description: "Enviar un link al canal de links.",
	category: "move",
	permissions: "ADMINISTRATOR",
	whitelist: ["914565833248874506"],
	func: (bot, message, init, embed, footer) => {
		// YOUR CODE HERE
		let linksChannel = bot.channels.cache.get('917461828777410590');
		if(!linksChannel) return message.channel.send(embed({
			title: "Links",
			description: "El canal de links no se encuentra disponible.",
			footer
		}));

		let separator = message.content.slice(init.length+1).split('>>', 2);
		if(!separator[1]) return message.channel.send(embed({
			title: "Links",
			description: "Ingresa un segundo argumento.",
			footer
		})); 

		linksChannel.send(embed({
			title: separator[0],
			description: separator[1],
			footer
		})).then(() => {
			message.channel.send(embed({
				title: "Links",
				description: "Se ha podido enviar correctamente el link.",
				fields: [{
					title: "Link",
					text: `${separator[1]}`
				}, {
					title: "Nombre",
					text: separator[0]
				}, {
					title: "Final Link",
					text: `[${separator[0]}](${separator[1]})`
				}],
				footer
			}))
		})
	}
}