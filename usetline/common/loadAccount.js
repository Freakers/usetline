const admin = require('firebase-admin');
serviceAccount = require('../serviceAccount.json');
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
let db = admin.firestore();

module.exports.Account = async function (userKey, jsonObj) {
    var myAccount = jsonObj;
    //console.log("|" + JSON.stringify(jsonObj) + "|")
    docRef = await db.collection('Users/' + userKey + '/Account').add(myAccount)
        .then(function (docRef) {
            console.log("AccountID : ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error in Load Account: ", error);
        });
}