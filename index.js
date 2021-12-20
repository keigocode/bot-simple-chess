const env = require('env');
const {MordeKayh} = require('automata-bot.js');
const bot = new MordeKayh();
const embed = bot.embed;
const handler = require('clayber-handler');
const manager = new handler('./commands');
const express = require('express')();
express.listen(8080);
express.use((req, res) => res.send({message: "upload"}));
const {baseIA} = require('./ia.js');
const ia = new baseIA();

bot.on('ready', () => {
	bot.user.setActivity({
		activity: {
			name: "chess.com"
		},
		name: "chess.com"
	})
	console.log(`${bot.user.username}#${bot.user.discriminator} chess has been on`);
})

bot.on('message', (message) => {
	if(message.author.bot == true) return;
	ia.learning(message.content)

	let prefix = "up!";
	if(message.content.startsWith(prefix)){
		let init = message.content.split(' ', 1)[0];
		let commandExec = init.slice(prefix.length);
		let footer = {
			text: message.author.tag, 
			icon: message.author.avatarURL()
		}

		let command = manager.get(commandExec);
		if(!command) return message.channel.send(embed({
			title: "Comandos",
			description: "Este comando no existe.",
			footer
		}));

		// OTHER COS THE COMMAND
		let permissions = command.permissions?message.member.hasPermission(command.permissions):true;
		let whitelist = command.whitelist?command.whitelist.find(ch => ch == message.guild.id):true;
		if(!permissions) return message.channel.send(embed({
			title: "Acción fallida",
			description: `Este comando necesita el permiso: ${command.permissions}`
		}));
		if(!whitelist) return message.channel.send(embed({
			title: "Lista blanca",
			description: "Este comando no puede ser ejecutado en este servidor."
		}));

		command.func(bot, message, init, embed, footer);
	}
})

bot.login(process.env.bot);