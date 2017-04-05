'use strict'
class Driver {
    constructor(driver){
        this.name = driver;
        this.MPHRecorded = [];
        this.totalMiles = 0;
    }
    recordDrive(mph, miles) {
        if(mph <= 100 && mph >= 5) {
            this.totalMiles += miles;
            this.MPHRecorded.push(mph);
        }
    }
    checkForEligibility(start, end, miles) {
        if(start == null || end == null || miles == null) {
            return 'Something went wrong!';
        }
        let normalizedMiles = Math.round(miles);
        let time = this.returnTimeforTripinHours(start, end);
        let mph = this.returnMPHTrip(time, normalizedMiles);
        this.recordDrive(mph, normalizedMiles);

    }
    returnMPHTrip(time, miles) {
        if(time == null || miles == null){
            return 0;
        }
        return miles/time;
    }
    returnTimeforTripinHours(start, end) {
        if(start == null || end == null) {
            return 0;
        }
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
