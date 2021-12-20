const ChessWebAPI = require('chess-web-api');
const apiChess = new ChessWebAPI();
const {number, getNumber, getNumberStyle} = require('./../utils/forNumber.js');

module.exports = {
	value: ['command'],
	description: "Envia tu movimiento y jugada.",
	category: "move",
	func: (bot, message, init, embed, footer) => {
		// YOUR CODE HERE
	}
};