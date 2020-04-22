// Retrieve root collection from database
module.exports.getDocument = function (collectionName, documentId) {
    const admin = require('firebase-admin');
    let serviceAccount = require('../config/serviceAccount.json');
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    let db = admin.firestore();
    let tourneyRef = db.collection(collectionName).doc(documentId);
    let getDoc = tourneyRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
}