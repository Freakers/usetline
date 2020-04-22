let ParentObj = require('./Parent');
class Event extends ParentObj{

	constructor(eventName,tags){
		super();
		this.eventName = eventName;
		this.tags= tags || [];
	}
}