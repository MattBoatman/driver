'use strict'
class Driver {
    constructor(driver){
        this.name = driver;
        this.MPHRecorded = [];
        this.totalMiles = 0;
    }
    recordDrive(mph, miles) {
        this.totalMiles += miles;
        this.MPHRecorded.push(mph);
    }
    checkForEligibility(start, end, miles) {
        let normalizedMiles = Math.round(miles);
        let time = this.returnTimeforTripinHours(start, end);
        let mph = this.returnMPHTrip(time, normalizedMiles);
        if(mph < 100 || mph > 5) {
            this.recordDrive(mph, normalizedMiles);
        }

    }
    returnMPHTrip(time, miles) {
        return miles/time;
    }
    returnTimeforTripinHours(start, end) {
        let startSplit = start.split(':');
        let endSplit = end.split(':');
        let startMinutes = (parseInt(startSplit[0])*60)+parseInt(startSplit[1]);
        let endMinutes = (parseInt(endSplit[0])*60)+parseInt(endSplit[1]);

        return (endMinutes - startMinutes)/60;
    }
    generateReport() {
        let averageMPH = this.MPHRecorded.reduce((a,b) => (a+b), 0) / this.MPHRecorded.length;
        let resultString = this.totalMiles ? ' miles @ ' + Math.round(averageMPH) + ' mph' : "";
        return this.name + ': ' + this.totalMiles + resultString;
    }
}

module.exports = Driver;
