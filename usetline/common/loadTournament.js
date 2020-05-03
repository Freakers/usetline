module.exports.Tournament = function (jsonfile) {
    var loadEvent = require(jsonfile)
    var myEvent = JSON.parse(JSON.stringify(loadEvent))
    const admin = require('firebase-admin');
    let serviceAccount = require('../serviceAccount.json');
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    let db = admin.firestore();
    let docRef = db.collection('Events').add(myEvent)
        .then(function (docRef) {
            console.log("Tournamant created with ID: ", docRef.id);

        })
        .catch(function (error) {
            console.error("Error creating tournament: ", error);
        });
    return db;
}