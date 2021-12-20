const ChessWebAPI = require('chess-web-api');
const apiChess = new ChessWebAPI();
const {number, getNumber, getNumberStyle} = require('./../utils/forNumber.js');

module.exports = {
	value: ['stats', 'player.stats', 'estadisticas', 'jugador.estadisticas'],
	description: "Mira las estadisticas de un jugador.",
	category: "move",
	func: (bot, message, init, embed, footer) => {
		// YOUR CODE HERE
		let playerName = message.content.slice(init.length+1);
		if(!playerName) return message.channel.send(embed({
			title: "Chess.com",
			description: "Agrega el nombre de usuario.",
			footer
		}));

		apiChess.getPlayerStats(playerName).then((data) => {
			let stats = data.body;
			message.channel.send(embed({
				title: `Estadisticas de ${playerName}`,
				description: `⭐ **Información**`,
				fields: [{
					title: "Partidas diarias",
					text: `📎 **Pasada:** \n > ELO: ${stats.chess_daily.last.rating} \n > Jugó: <t:${stats.chess_daily.last.date}:R> \n > Presición: ${stats.chess_daily.last.rd} \n 📎 **Mejor: ** \n > ELO: ${stats.chess_daily.best.rating} \n > Jugó: <t:${stats.chess_daily.best.date}:R> \n :star: [Mirar juego](${stats.chess_daily.best.game})`
				}],
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
};