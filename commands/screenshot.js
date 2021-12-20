module.exports = {
	value: ['screenshot', 'capturapantalla', 'shot', 'upload', 'image', 'img', 'imagen', 'foto', 'photo'],
	description: "Sube una imagen a la nube.",
	category: "move",
	func: (bot, message, init, embed, footer) => {
		// YOUR CODE HERE
		let screenshots = bot.channels.cache.get('917461769562251314');
		if(!screenshots) return message.channel.send(embed({
			title: "Imagenes",
			description: "Este servicio esta inhabilitado.",
			footer
		}));

		let description = message.content.slice(init.length);
		let files = message.attachments.first();
		if(!files) return message.channel.send(embed({
			title: "Imagenes",
			description: "Necesitas agregar una imagen para poder subirla.",
			footer
		}));

		screenshots.send(embed({
			title: `Imagenes`,
			description: `${description?description:"No tiene descripción"}`,
			image: files.proxyURL,
			footer
		})).then((msg) => {
			message.delete();
			message.channel.send(embed({
				title: "Imagenes",
				description: `Se ha guardado la imagen`,
				fields: [{
					title: "ID",
					text: msg.id,
				}, {
					title: "Vista de la imagen",
					text: `[Imagen](${files.proxyURL})`
				}, {
					title: "URL",
					text: `[Mensaje](https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})`
				}, {
					title: "Descripción",
					text: description?description:"No tiene descripción."
				}],
				image: files.proxyURL,
				footer
			}))
		}).catch(() => {
			message.channel.send(embed({
				title: "Imagenes",
				description: "No se pudo subir esta imagen",
				footer
			}))
		})
	}
}