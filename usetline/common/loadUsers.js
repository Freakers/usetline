var load = require('../common/loadAccount.js');
const admin = require('firebase-admin');
serviceAccount = require('../serviceAccount.json');
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
let db = admin.firestore();

module.exports.Users = async function (usersJSONfile, accountsJSONfile) {
    var loadUsers = require(usersJSONfile);
    var loadAccounts = require(accountsJSONfile);
    var myUsers = JSON.parse(JSON.stringify(loadUsers));
    var myAccounts = JSON.parse(JSON.stringify(loadAccounts));
    var userKeys = {};
    var x = "0";
    for (i in myUsers) {
        docRef = await db.collection('Users').add(myUsers[i])
            .then(function (docRef) {
                console.log("User ID: ", docRef.id);
                userKeys[x++] = docRef.id;
                //console.log("My Account = " + JSON.stringify(myAccounts[i]));
                accRef = load.Account(docRef.id, myAccounts[i]).then(function (accRef) {
                }).catch(function (error) {
                    console.error("Error Adding Account: ", error );
                });
            })
            .catch(function (error) {
                returnValue = null;
                console.error("Error adding User: ", error);
            });
    }    
}