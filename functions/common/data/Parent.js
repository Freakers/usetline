const genId = require('../genId');
const firebase = require('../firebase');

class parentObj{
	constructor(){
		
		this.id= null;
		this.created_at= firebase.getTimestamp();
		this.updated_at= firebase.getTimestamp();
	}
}