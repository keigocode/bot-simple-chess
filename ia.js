if(!require('node-localstorage')){
	throw new Error('ia use the node-localstorage')
}

const {LocalStorage} = require('node-localstorage');
const ia = new LocalStorage('./ia');

class base {
	constructor(){
		this.cache = [];
		this.ultimate = null;
		this.new = null;
	}
	start(){
		let database = ia.getItem('ia-manager.data');
		if(!database){
			ia.setItem('ia-manager.data', JSON.stringify({
				util: [],
				blacklist: [],
				options: {}
			}))
			return JSON.parse(ia.getItem('ia-manager.data'));
		}else {
			return JSON.parse(database);
		}
	}
	setData(simple){
		let data = this.start();
		if(simple instanceof Object){

			let finder = data.util.find(ch => ch.data.toLowerCase() == simple.data.toLowerCase());
			if(!finder){
				data.util.push({
					type: simple.type,
					data: simple.data,
					used: 1,
					response: [{
						used: 1,
						send: simple.response
					}]
				})				
			}else {
				data.util.forEach((element, i, array) => {
					if(element.data.toLowerCase() == finder.data.toLowerCase()){
						array[i].used = array[i].used + 1;
						let responsexist = element.response.find(ch => ch.send.toLowerCase() == simple.response);
						if(responsexist) {
							element.response.forEach((ele, i2, arr) => {
								if(ele.send == responsexist.send){
									responsexist.used = responsexist.used + 1;
									arr[i2] = responsexist;
									array[i].response = arr;
									data.util = array;
								}
							})
						}else {
							array[i].response.push({
								used: 0,
								send: simple.response
							})
							data.util = array;
						}
					}
				})
			}

			// SET ITEM IN IA MANAGER
			ia.setItem('ia-manager.data', JSON.stringify(data));
		}else {
			throw new Error('This is not a Object');
		}
	}
	getResponse(datastring){
		let alldata = this.start().util;
		let finder = alldata.find(ch => ch.data.toLowerCase() == datastring.toLowerCase());
		if(!alldata) return null;

		let used = finder.response.sort((a, b) => b.used-a.used);
		return {
			response: used[0].send,
			allResponse: used.map(ch => ch.send),
			random: used[Math.floor(Math.random()*used.length)].send
		}
	}
	learning(datastring){
		this.cache.push(datastring);
		this.ultimate = this.new;
		this.new = datastring;
		if(this.ultimate){
			this.setData({
				data: this.ultimate,
				response: this.new
			})
		}
	}
}

module.exports = {baseIA: base}