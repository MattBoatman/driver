'use strict'
let Driver = require('./Driver');

class Root {
constructor(fileName = 'input.txt') {
  this.fileName = fileName;
  this.driverCollection = [];
  this.unmatchedCollection = [];
}
readFile() {   
    let lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(this.fileName)
    });
    lineReader.on('line', (line) => {
      this.onLine(line);
    }).on('close', () => {
      this.onClose(this.driverCollection, this.unmatchedCollection);
    });
  }
onLine(line){
      let parsedLine = line.split(" ");
      if(parsedLine[0] === 'Driver') {
        this.addToCollection(this.driverCollection, new Driver(parsedLine[1]));
      } else if (parsedLine[0] === 'Trip') {
        let matchingDriver = this.driverCollection.find(obj => {return obj.name === parsedLine[1]});
        if(matchingDriver) {
          matchingDriver.checkForEligibility(parsedLine[2], parsedLine[3], parsedLine[4])
        } else {
          this.addToCollection(this.unmatchedCollection, parsedLine);        
        }
      } 
  }
onClose() {
      if(this.unmatchedCollection.length > 0) {
        this.unmatchedCollection.forEach((unMatchedObj) => {
          let match = this.driverCollection.find(currentObj => {
            return currentObj.name === unMatchedObj[1]
          });
        if(match) {
          match.checkForEligibility(unMatchedObj[2], unMatchedObj[3], unMatchedObj[4]);
        } else {
          console.log('ERROR: Driver', unMatchedObj[1], 'is not registered');
        }
      });
    }
    this.driverCollection.sort((a,b) => b.totalMiles-a.totalMiles).forEach((obj) => console.log(obj.generateReport()));
  }
  addToCollection(collection, driver) {
      collection.push(driver);
  }

}
module.exports = Root;
