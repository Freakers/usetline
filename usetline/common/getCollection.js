// Retrieve root collection from database
module.exports.getCollection = function (collectionName) {
    const admin = require('firebase-admin');
    let serviceAccount = require('../config/serviceAccount.json');
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    let db = admin.firestore();
    let tourneyRef = db.collection(collectionName);
    let allDocs = tourneyRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}