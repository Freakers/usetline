function makeTourney1() {
    var make = require('../common/makeTournamentBid.js');
    var loadBid1 = require('../data/DemoBid1.json');
    var myBid1 = JSON.parse(JSON.stringify(loadBid1));
    var bid = make.Bid(myBid1);
}
function makeTourney2() {
    var make = require('../common/makeTournamentBid.js');
    var loadBid2 = require('../data/DemoBid2.json');
    var myBid2 = JSON.parse(JSON.stringify(loadBid2));
    var bid = make.Bid(myBid2);
}
function makeTourney3() {
    var make = require('../common/makeTournamentBid.js');
    var loadBid3 = require('../data/GusBid1.json');
    var myBid3 = JSON.parse(JSON.stringify(loadBid3));
    var bid = make.Bid(myBid3);
}
function makeTourney4() {
    var make = require('../common/makeTournamentBid.js');
    var loadBid4 = require('../data/GusBid2.json');
    var myBid4 = JSON.parse(JSON.stringify(loadBid4));
    var bid = make.Bid(myBid4);
}
function makeTourney5() {
    var make = require('../common/makeTournamentBid.js');
    var loadBid5 = require('../data/WilsonBid1.json');
    var myBid5 = JSON.parse(JSON.stringify(loadBid5));
    var bid = make.Bid(myBid5);
}
function makeTourney6() {
    var make = require('../common/makeTournamentBid.js');
    var loadBid6 = require('../data/WilsonBid2.json');
    var myBid6 = JSON.parse(JSON.stringify(loadBid6));
    var bid = make.Bid(myBid6);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function delay() {
    makeTourney1();
    await sleep(3000);
    makeTourney2();
    await sleep(3000);
    makeTourney3();
    await sleep(3000);
    makeTourney4();
    await sleep(3000);
    makeTourney5();
    await sleep(3000);
    makeTourney6();
}

delay();

