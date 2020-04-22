module.exports.Users = function (jsonfile) {
    var loadUser = require(jsonfile);
    var myUsers = JSON.parse(JSON.stringify(loadUser));
    const admin = require('firebase-admin');
    let serviceAccount = require('../config/serviceAccount.json');
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    let db = admin.firestore();
    for (x in myUsers) {
        let docRef = db.collection('Users').doc(x).set(myUsers[x]);
        if (docRef != null) {
            console.log("Loaded UserId: " + myUsers[x]['userId']);
        } else {
            console.log("Load Failed for " + myUsers[x]['userId']);
        }
    }
}