module.exports = {
	value: ['win', 'winner', 'ganada', 'partida.ganada'],
	description: "Ganaste una partida.",
	category: "move",
	permissions: "ADMINISTRATOR",
	whitelist: ["914565833248874506"],
	func: (bot, message, init, embed, footer) => {
		let channelLoss = bot.channels.cache.get('917461330921914528');
		if(!channelLoss) return message.channel.send(embed({
			title: "Partida ganada",
			description: "El canal de partidas ganadas no se encuentra.",
			footer
		}));

		let description = message.content.slice(init.length);
		let files = message.attachments.first();
		if(!files) return message.channel.send(embed({
			title: "Partida ganada",
			description: "Necesitas agregar una imagen acerca de su partida.",
			footer
		}));

		channelLoss.send(embed({
			title: `Partida ganada #${channelLoss.messages.cache.size}`,
			description: `${description?description:"No tiene descripción"}`,
			image: files.proxyURL,
			footer
		})).then((msg) => {
			message.delete();
			message.channel.send(embed({
				title: "Partida ganada",
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
				title: "Partidas ganadas",
				description: "No se pudo agregar la partida.",
				footer
			}))
		})
	}
}