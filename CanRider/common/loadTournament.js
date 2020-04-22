module.exports.Tournament = function (jsonfile) {
    var loadEvent = require(jsonfile)
    var myEvent = JSON.parse(JSON.stringify(loadEvent))
    const admin = require('firebase-admin');
    let serviceAccount = require('../config/serviceAccount.json');
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    let db = admin.firestore();
    let docRef = db.collection('Tournaments').doc(myEvent.description.toString()).set(myEvent);
    if (docRef != null) {
        console.log("Loaded " + jsonfile);
        return db;
    } else {
        console.log(jsonfile + " Load Failed");
        return null;
    }
}