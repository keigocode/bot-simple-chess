const ChessWebAPI = require('chess-web-api');
const apiChess = new ChessWebAPI();
const {number, getNumber, getNumberStyle} = require('./../utils/forNumber.js');

module.exports = {
	value: ['getplayer', 'obtenerjugador', 'jugador', 'player'],
	description: "Obten la información de un jugador.",
	category: "move",
	func: (bot, message, init, embed, footer) => {
		// YOUR CODE HERE
		let playerName = message.content.slice(init.length+1);
		if(!playerName) return message.channel.send(embed({
			title: "Chess.com",
			description: "Agrega el nombre de usuario.",
			footer
		}));

		apiChess.getPlayer(playerName).then((data) => {
			message.channel.send(embed({
				title: `Jugador ${data.body.username}`,
				description: `⭐ [Perfil del usuario en chess.com](${data.body.url}) \n\n > Seguidores: ${getNumber(data.body.followers)} \n > Localización: ${data.body.location?data.body.location:"No registrada."} \n > Streamer: ${data.body.is_streamer == true?"Si":"No"} \n > Plan: ${data.body.status} \n > ID: ${data.body.player_id} \n > Se ha unido: <t:${data.body.joined}:R> \n > Ultima vez activo: <t:${data.body.last_online}:R> \n > Nombre: ${data.body.name?data.body.name:"No tiene nombre registrado."} \n > Rango: ${data.body.title?data.body.title:"Usuario"}`,
				thumbnail: data.body.avatar,
				footer
			}))
		}).catch(() => {
			message.channel.send(embed({
				title: "Chess.com",
				description: `El usuario `+playerName+` no existe.`,
				footer
			}))
		})
	}
}