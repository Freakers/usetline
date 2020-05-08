// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// Database trigger when bid is added to the Bids collection
// Trigger the processBid() which binds the bid to the user and updates bid total and yield 
// in the event for the proposition and outcome associated to the bid
exports.addBid = functions.firestore
    .document('Bids/{bidId}')
    .onCreate( async (doc, context) => {
        const newBid = doc.data();
        const created = doc.data().created;
        const eventId = doc.data().eventId;
        const propositionId = doc.data().propositionId;
        const bidsize = doc.data().bidsize;
        const outcome = doc.data().outcome;
        const userid = doc.data().userName;
        const bidId = context.params.bidId;
        console.log('bid', newBid);
        console.log('bidId', bidId);
        let x = await processBid(created, userid, eventId, propositionId, bidsize, outcome);
        return 0;
    });
// This is the main program that calls the functions responsible for attaching the 
// bid to the user's bid collection and updating all pool totals within the event 
// for each proposition and outcome
async function processBid(created, user, event, prop, bid, outcome) {
    let users = addBidToUser('Users', created, user, event, prop, bid, outcome);
    let evnt = await getEvent(event);
    let updateEvent = await updateEventPoolDocument('Events', evnt.id, evnt, prop, bid, outcome )
    return 0;
}
//
// This function updates all bidding pools in the event document 
// This function updates the total bid and yield on each outcome associated to a proposition 
// within an event and also keeps track of the total amount invested in each proposition.
async function updateEventPoolDocument(collectionName, documentId, evnt, prop, bid, outcome) {
    let db = admin.firestore();

    try {
        //console.log('collection : ', collectionName, 'doc id: ', documentId, 'data: ', evnt.data())
        let tourneyRef = db.collection(collectionName).doc(documentId);
        let eventData = evnt.data();
        let oldbidtotal = eventData.propositions[`${prop}`].outcomes[`${outcome}`].total;
        let oldtotalbid = eventData.propositions[`${prop}`].totalBid;
        let newbidtotal = oldbidtotal + bid;
        let newtotalbid = oldtotalbid + bid;
        eventData.propositions[`${prop}`].totalBid = newtotalbid;
        eventData.propositions[`${prop}`].outcomes[`${outcome}`].total = newbidtotal;
        //console.log('Old Outcomes : ', eventData.propositions[`${prop}`].outcomes);
        let x = calculateYield(eventData.propositions[`${prop}`].outcomes, newtotalbid); 
        eventData.propositions[`${prop}`].outcomes = x; 
        //console.log('New Outcomes : ', eventData);
        return tourneyRef.update(eventData);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// Not used currently  
async function getDocument(collectionName, documentId) {
    let db = admin.firestore();
    try {
        let tourneyRef = db.collection(collectionName).doc(documentId);
        return tourneyRef.length > 0 ? tourneyRef : null;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// Retrieves an event document by its event description from the Events collection
async function getEvent(eventId) {
    let db = admin.firestore();

    try {
        let tourneyRef = db.collection('Events').where('description', '==', eventId);
        let docs = await tourneyRef.get();
        let arry = [];
        docs.forEach((doc) => {
            arry.push(doc);
        });
        return arry.length > 0 ? arry[0] : null;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// This function takes a bid loaded into the database and adds the bid data to the users bids collection   
async function addUserBid(collectionName, documentId, created, eventId, propId, bid, outcome) {
    let db = admin.firestore();

    try {
        let userRef = db.collection(collectionName + '/' + documentId + '/Bids');
        return await userRef.doc().add({
            "id": userRef.id,
            "created": created,
            "eventId": eventId,
            "propositionId": propId,
            "bidsize": bid,
            "outcome": outcome
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// Add the incomming bid to the users document for transaction tracking by user
// Search through Users Collection and find user name that matches username on the bid transaction
async function addBidToUser(collectionName, created, userId, eventId, propId, bid, outcome) {
    let db = admin.firestore();

    try {
        let evnts = db.collection(collectionName);
        let docs = await evnts.get()
        docs.forEach((doc) => {
            if (doc.data().userName === userId) {
                userBid = addUserBid(collectionName, doc.id, created, eventId, propId, bid, outcome);
            }
        });
        return 0;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// Calculate yield for outcomes within a proposition
function calculateYield(data, totbids) {
    try {
        const outcomes = data;
        let arry = [];
        //console.log(outcomes);
        for (outcome in outcomes) {
            let outcm = outcome;
            let totbid = outcomes[`${outcm}`].total;
            let yield = 0;
            if (totbid > 0) {
                yield = ((totbids - totbid) / totbid) + 1;
                outcomes[`${outcm}`].yield = yield;
            }
        }
        //console.log(outcomes);
        return outcomes;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// This function takes a user and joins then to an event   

