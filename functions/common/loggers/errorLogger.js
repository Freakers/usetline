const firebase = require('../firebase');
const db = firebase.db;
const constants = require('../constants');
// this is what an error looks like
class ErrorLog {
  constructor(context, error) {
    
    this.context = context;
    this.error = error.message;
    this.errorstack = error.stack;
    this.timeStamp = firebase.getTimestamp();
    this.id = null;
  }

  async log() {
    const ref = db.collection(constants.COLLECTIONS.errors);
    this.id = ref.doc().id;// get an id
    const body = Object.assign({}, this);

    return await ref.doc(this.id).set(body)
        .then(() => console.log('Wrote error ' + this.id))
        .catch((error) => {
          console.error('Error writing Error document: ', error);
        });
  }
}

module.exports = async function(context, error) {
  const e = new ErrorLog(context, error);
  return await e.log();
};
