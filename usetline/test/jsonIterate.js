var mydata = { "outcomes": {
        "Steve Mullings": {
          "total": 100,
          "yield": 0
        },
        "Justin Gatlin": {
          "total": 200,
          "yield": 0
        },
        "Maurice Greene": {
          "total": 400,
          "yield": 0
        },
        "Nesta Carter": {
          "total": 900,
          "yield": 0
        },
        "Asafa Powell": {
          "total": 1000,
          "yield": 0
        },
        "Yohan Blake": {
          "total": 500,
          "yield": 0
        },
        "Tyson Gay": {
          "total": 800,
          "yield": 0
        },
        "Usain Bolt": {
          "total": 1100,
          "yield": 0
        }
      },
      "totalBid": 4000,
      "result": "Usain Bolt"
}

function calculateYield(data, totbids) {

  let propositions = JSON.parse(JSON.stringify(data));
  propositions.totalBid = totbids;

  for (outcome in propositions.outcomes) {
    let outcomebidinfo = propositions.outcomes[`${outcome}`];
    outcomebidinfo.yield = ((totbids - outcomebidinfo.total)/outcomebidinfo.total)+1
  }

  return propositions;
}

console.log(calculateYield(mydata, 5000));