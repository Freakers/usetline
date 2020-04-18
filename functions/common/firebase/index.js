const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

exports.admin=admin;


exports.db = admin.firestore();
exports.functions = functions;

exports.getBatch = function(){
    let b = this.db.batch();
    return b;
}

exports.getTimestamp = () => {
  const t = this.admin.firestore.Timestamp.fromDate(new Date());
  return t;
};
