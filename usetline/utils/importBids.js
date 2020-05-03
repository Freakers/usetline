var make = require('../common/makeTournamentBid.js');
var loadBid = require('../data/TournamentBids.json');
var myBid = JSON.parse(JSON.stringify(loadBid));
var bid = make.Bid(myBid);