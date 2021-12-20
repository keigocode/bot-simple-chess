module.exports = {
	value: ['draw', 'empate', 'partida.empate', 'empatada'],
	description: "Empataste una partida.",
	category: "move",
	permissions: "ADMINISTRATOR",
	whitelist: ["914565833248874506"],
	func: (bot, message, init, embed, footer) => {
		let channelLoss = bot.channels.cache.get('917461356633030698');
		if(!channelLoss) return message.channel.send(embed({
			title: "Partida empatada",
			description: "El canal de partidas empatada no se encuentra.",
			footer
		}));

		let description = message.content.slice(init.length);
		let files = message.attachments.first();
		if(!files) return message.channel.send(embed({
			title: "Partida empatada",
			description: "Necesitas agregar una imagen acerca de su partida.",
			footer
		}));

		channelLoss.send(embed({
			title: `Partida empatada #${channelLoss.messages.cache.size}`,
			description: `${description?description:"No tiene descripción"}`,
			image: files.proxyURL,
			footer
		})).then((msg) => {
			message.delete();
			message.channel.send(embed({
				title: "Partida empatada",
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
				title: "Partidas empatadas",
				description: "No se pudo agregar la partida.",
				footer
			}))
		})
	}
}