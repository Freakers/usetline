module.exports.Accounts = async function (jsonfile, userKeys) {
    console.log("Accounts");
    var loadAccounts = require(jsonfile);
    var myAccounts = JSON.parse(JSON.stringify(loadAccounts));
    const admin = require('firebase-admin');
    serviceAccount = require('../serviceAccount.json');
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    let db = admin.firestore();
    console.log("Passed in User Keys: " + userKeys);
    for (userkey in userKeys) {
        console.log("User DocID: ", userkey);
        for (key in myAccounts) {
            //console.log("User : ", myUsers[key]);
            let docRef = await db.collection('/Users/' + docRef.id + '/Account').add(myAccounts[key])
                .then(function (docRef) {
                    console.log("Account written with ID: ", docRef.id);

                })
                .catch(function (error) {
                    console.error("Error adding Account: ", error);
                });
        }
    }
}