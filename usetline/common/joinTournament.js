const admin = require('firebase-admin');
let serviceAccount = require('../serviceAccount.json');
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
let db = admin.firestore();

module.exports.joinTournament = async function joinUserToEvent(eventId, username) {
    try {

        let tourneyRef = db.collection('Events');
        let evnt = await tourneyRef.get()
        evnt.forEach((doc) => {
            if (doc.data().user.description === eventId) {
                return 0;
            } else {
                addUserToEvent(doc.id, doc, username);
                return 0;
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function addUserToEvent(eventKey, evnt, username) {
    try {

        let tournament = db.collection('Events').doc(eventKey);
        let eventData = evnt.data();
        eventData.users[`${username}`] = "Joined";
        console.log(eventData);
        let d = tournament.set(eventData);
        return 0;
    } catch (error) {
        console.log(error);
        throw error;
    }
}