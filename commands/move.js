module.exports = {
	value: ['movement', 'move', 'movimiento', 'jugada'],
	description: "Envia tu movimiento y jugada.",
	category: "move",
	permissions: "ADMINISTRATOR",
	whitelist: ["914565833248874506"],
	func: (bot, message, init, embed, footer) => {
		let channelMovements = bot.channels.cache.get('917461403173019699');
		if(!channelMovements) return message.channel.send(embed({
			title: "Movimiento",
			description: "El canal de movimientos no se encuentra.",
			footer
		}));

		let description = message.content.slice(init.length);
		let files = message.attachments.first();
		if(!files) return message.channel.send(embed({
			title: "Movimientos",
			description: "Necesitas agregar una imagen acerca del movimiento.",
			footer
		}));

		channelMovements.send(embed({
			title: `Movimiento #${channelMovements.messages.cache.size}`,
			description: `${description?description:"No tiene descripción"}`,
			image: files.proxyURL,
			footer
		})).then((msg) => {
			message.delete();
			message.channel.send(embed({
				title: "Movimiento guardado",
				description: `Se ha guardado el movimiento`,
				fields: [{
					title: "ID",
					text: msg.id,
				}, {
					title: "URL",
					text: `[Movimiento guardado](https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})`
				}],
				footer
			}))
		}).catch(() => {
			message.channel.send(embed({
				title: "Movimientos",
				description: "No se pudo guardar este movimiento.",
				footer
			}))
		})
	}
}