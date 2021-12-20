module.exports = {
	value: ['loss', 'losse', 'perdida', 'partida.perdida'],
	description: "Perdiste una partida.",
	category: "move",
	permissions: "ADMINISTRATOR",
	whitelist: ["914565833248874506"],
	func: (bot, message, init, embed, footer) => {
		let channelLoss = bot.channels.cache.get('917461341567058000');
		if(!channelLoss) return message.channel.send(embed({
			title: "Partida perdida",
			description: "El canal de partidas perdidas no se encuentra.",
			footer
		}));

		let description = message.content.slice(init.length);
		let files = message.attachments.first();
		if(!files) return message.channel.send(embed({
			title: "Partida perdida",
			description: "Necesitas agregar una imagen acerca de su partida.",
			footer
		}));

		channelLoss.send(embed({
			title: `Partida perdida #${channelLoss.messages.cache.size}`,
			description: `${description?description:"No tiene descripción"}`,
			image: files.proxyURL,
			footer
		})).then((msg) => {
			message.delete();
			message.channel.send(embed({
				title: "Partida perdida",
				description: `Se ha guardada la partida.`,
				fields: [{
					title: "ID",
					text: msg.id,
				}, {
					title: "URL",
					text: `[Partida guardada](https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})`
				}],
				footer
			}))
		}).catch(() => {
			message.channel.send(embed({
				title: "Partidas perdidas",
				description: "No se pudo agregar la partida.",
				footer
			}))
		})
	}
}