exports.testFunction = functions.firestore
    .document('Bids/{bidId}')
    .onCreate( async (doc, context) => {
        console.log('hi')
    });