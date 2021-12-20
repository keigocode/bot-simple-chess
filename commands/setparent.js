module.exports = {
	value: ['setparent', 'parent', 'channel.parent'],
	description: "Mueve un canal a una categoria.",
	category: "move",
	permissions: "MANAGE_CHANNELS",
	func: (bot, message, init, embed, footer) => {
		// YOUR CODE HERE
		let permissions = message.member.hasPermission('MANAGE_CHANNELS');
		if(!permissions) return message.channel.send();
		let idSeparator = message.content.slice(init.length+1);
		let idChannel = idSeparator.split(' ', 1)[0];
		let parentChannel = message.content.slice(init.length+idChannel.length+2);

		let categoryParent = message.guild.channels.cache.get(parentChannel);
		let channelParent = message.guild.channels.cache.get(idChannel);
		if(!channelParent) return message.channel.send(embed({
			title: "Mover canal",
			description: "El canal espesificado no existe.",
			footer
		}));
		if(!categoryParent) return message.channel.send(embed({
			title: "Mover canal.",
			description: "Este canal no pudo moverse la categoria indicada, porque no existe.",
			footer
		}));

		channelParent.setParent(categoryParent.id).then((data) => {
			message.channel.send(embed({
				title: "Mover canal",
				description: `El canal <#${channelParent.id}> fue movido a la categoria: ${categoryParent.name}.`,
				footer
			}))
		}).catch((err) => {
			message.channel.send(embed({
				title: "Mover canal",
				description: "No se pudo mover el canal. Ha ocurrido un error.",
				fields: [{
					title: "Log",
					text: err.toString()
				}],
				footer
			}))
		})
	}
}