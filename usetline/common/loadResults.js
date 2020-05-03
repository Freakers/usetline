const admin = require('firebase-admin');
serviceAccount = require('../serviceAccount.json');
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
let db = admin.firestore();

module.exports.Results = async function (jsonfile) {
    var loadResults = require(jsonfile);
    var myResults = JSON.parse(JSON.stringify(loadResults));
    let docRef = await db.collection('Results').add(myResults)
                .then(function (docRef) {
                    console.log("Result written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding Account: ", error);
                });
}