const admin = require('firebase-admin');
let serviceAccount = require('../serviceAccount.json');
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
let db = admin.firestore();

module.exports.Bid = async function (jsonObj) {
    var myBid = jsonObj;
    myBid.created = new Date().toJSON();
    myBid.lastUpdated = new Date().toJSON();
    let docRef = await db.collection('Bids').add(myBid )
        .then(function (docRef) {
            // console.log("Bid ID: ", docRef.id);
            return null;
        })
        .catch(function (error) {
            console.error("Error creating bid: ", error);
        });
    return db;
} 