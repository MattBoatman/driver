'use strict'
let Driver = require('./Driver');
let driverCollection = [];
let unmatchedCollection = [];


var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(process.argv[2])
});

lineReader.on('line', (line) => {
  let parsedLine = line.split(" ");
  if(parsedLine[0] === 'Driver') {
    driverCollection.push(new Driver(parsedLine[1]));
  } else if (parsedLine[0] === 'Trip') {
    var matchingDriver = driverCollection.find(obj => {return obj.name === parsedLine[1]});
    if(matchingDriver) {
      matchingDriver.checkForEligibility(parsedLine[2], parsedLine[3], parsedLine[4])
    } else {
      unmatchedCollection.push(parsedLine);
    }
  }
}).on('close', () => {
  if(unmatchedCollection.length > 0) {
    unmatchedCollection.forEach((unMatchedObj) => {
      let match = driverCollection.find(currentObj => {
        return currentObj.name === unMatchedObj[1]
      })
    if(match) {
      match.checkForEligibility(unMatchedObj[2], unMatchedObj[3], unMatchedObj[4]);
    } else {
      console.log('ERROR: Driver', unMatchedObj[1], 'is not registered');
    }
  });
}
//TODO order by number of miles
  driverCollection.sort((a,b) => {return b.totalMiles-a.totalMiles}).forEach((obj) => console.log(obj.generateReport()));;

});;


