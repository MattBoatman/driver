describe('Driver Class Tests', () => {
    var Driver = require('../Driver');
    describe('Driver functions for a consistent driver', () => {
        var normalDriver;

        normalDriver = new Driver('Bob');
        it('.constructor test for default values', () => {
            expect(normalDriver.name).toEqual('Bob');
            expect(normalDriver.MPHRecorded).toEqual([]);
            expect(normalDriver.totalMiles).toEqual(0);
        });
        describe('.recordDrive', () => {
            beforeAll(function(){
                normalDriver.recordDrive(20, 5);
            });
            it('check for totalMiles to be updated', () => {
                expect(normalDriver.totalMiles).toEqual(5);
            });
            it('check for MPHRecorded to add 20 to the array', () => {
                expect(normalDriver.MPHRecorded).toEqual([20]);
            });
            it('check for MPHRecorded and totalMiles adding another drive', () => {
                normalDriver.recordDrive(10, 5);
                expect(normalDriver.MPHRecorded).toEqual([20, 10]);
                expect(normalDriver.totalMiles).toEqual(10);
            });
        });
        describe('.checkForEligibility', () => {
            it('check that returnTimeforTripinHours, returnMPHTrip, and recordDrive are called', () => {
                spyOn(normalDriver, 'returnTimeforTripinHours').and.returnValue(0.5, 17);
                spyOn(normalDriver, 'returnMPHTrip').and.returnValue(34, 17);;
                spyOn(normalDriver, 'recordDrive');
                normalDriver.checkForEligibility('07:15', '07:45', '17.3');
                expect(normalDriver.returnTimeforTripinHours).toHaveBeenCalledWith('07:15', '07:45');
                expect(normalDriver.returnMPHTrip).toHaveBeenCalledWith(0.5, 17);
                expect(normalDriver.recordDrive).toHaveBeenCalledWith(34, 17);

            });
        });
        describe('.returnMPHTrip', () => {
            it('return 0 for 0 miles', () => {
                expect(normalDriver.returnMPHTrip(3, 0)).toBe(0);
            });
            it('return 60 for 60 miles in 1 hour', () => {
                expect(normalDriver.returnMPHTrip(1, 60)).toBe(60);
            });
            it('return 30 for 60 miles in 2 hours', () => {
                expect(normalDriver.returnMPHTrip(2, 60)).toBe(30);
            })
        });
        describe('.returnTimeforTripinHours', () => {
            it('return .5 for inputs 07:15 07:45', () => {
                expect(normalDriver.returnTimeforTripinHours('07:15', '07:45')).toBe(.5);
            });
            it('return 1.25 for inputs 12:01 13:16', () => {
                expect(normalDriver.returnTimeforTripinHours('12:01', '13:16')).toBe(1.25);                
            });
            it('return 0.3333333333333333 for inputs 06:12 06:32', () => {
                expect(normalDriver.returnTimeforTripinHours('06:12', '06:32')).toBe(0.3333333333333333);                
            });
        });
        describe('.generateReport', () => {
            it('generate standard report for normal driver', () => {
                expect(normalDriver.MPHRecorded).toEqual([20,10]);
                expect(normalDriver.MPHRecorded.length).toBe(2);
                expect(normalDriver.generateReport()).toBe('Bob: 10 miles @ 15 mph');
            });
        });
    });
    describe('different driver scenarios', () => {

        describe('.recordDrive', () => {
            beforeEach(function(){
                recordDriver = new Driver('Carl');
            });
            it('less than 5 mph dont record drive', () => {
                recordDriver.recordDrive(4, 10);
                expect(recordDriver.totalMiles).toEqual(0);
                expect(recordDriver.MPHRecorded).toEqual([]);
            });
            it('more than 100 mph dont record', () => {
                recordDriver.recordDrive(101, 100);
                expect(recordDriver.totalMiles).toEqual(0);
                expect(recordDriver.MPHRecorded).toEqual([]);
            });
            it('undefined mph dont record', () => {
                recordDriver.recordDrive(undefined, undefined);
                expect(recordDriver.totalMiles).toEqual(0);
                expect(recordDriver.MPHRecorded).toEqual([]);
            });
        });

        describe('.checkForEligibility', () =>  {
            beforeEach(function(){
                eligibilityDriver = new Driver('Carl');
            });
            it('ensure miles gets rounded', () => {
                spyOn(eligibilityDriver, 'returnTimeforTripinHours').and.returnValue(0.5, 17);
                spyOn(eligibilityDriver, 'returnMPHTrip');
                eligibilityDriver.checkForEligibility('12:12', '24:24', 12.5);
                expect(eligibilityDriver.returnMPHTrip).toHaveBeenCalledWith(0.5, 13); //Note Math.round rounds up
            });
            it('return error message for any undefined values', () => {
                spyOn(eligibilityDriver, 'returnTimeforTripinHours');
                spyOn(eligibilityDriver, 'returnMPHTrip');
                spyOn(eligibilityDriver, 'recordDrive');
                var error = eligibilityDriver.checkForEligibility(undefined, "12:12", 123);
                expect(eligibilityDriver.returnTimeforTripinHours).not.toHaveBeenCalled();
                expect(eligibilityDriver.returnMPHTrip).not.toHaveBeenCalled();
                expect(eligibilityDriver.returnMPHTrip).not.toHaveBeenCalled();
                expect(error).toBe('Something went wrong!');
            });
            it('return error message for any empty values', () => {
                spyOn(eligibilityDriver, 'returnTimeforTripinHours');
                spyOn(eligibilityDriver, 'returnMPHTrip');
                spyOn(eligibilityDriver, 'recordDrive');
                var error = eligibilityDriver.checkForEligibility("23:32", "12:12");
                expect(eligibilityDriver.returnTimeforTripinHours).not.toHaveBeenCalled();
                expect(eligibilityDriver.returnMPHTrip).not.toHaveBeenCalled();
                expect(eligibilityDriver.returnMPHTrip).not.toHaveBeenCalled();
                expect(error).toBe('Something went wrong!');
            });
            it('return error message for any null values', () => {
                spyOn(eligibilityDriver, 'returnTimeforTripinHours');
                spyOn(eligibilityDriver, 'returnMPHTrip');
                spyOn(eligibilityDriver, 'recordDrive');
                var error = eligibilityDriver.checkForEligibility("23:32", null, 12);
                expect(eligibilityDriver.returnTimeforTripinHours).not.toHaveBeenCalled();
                expect(eligibilityDriver.returnMPHTrip).not.toHaveBeenCalled();
                expect(eligibilityDriver.returnMPHTrip).not.toHaveBeenCalled();
                expect(error).toBe('Something went wrong!');
            });
        });

        describe('.returnMPHTrip', () => {
            beforeEach(function(){
                noMilesDriver = new Driver('Carl');
            });
            it('return 0 if any value is undefined', () => {
                expect(noMilesDriver.returnMPHTrip(undefined, 10)).toBe(0);
            });
            it('return 0 if any value is null', () => {
                expect(noMilesDriver.returnMPHTrip(1, null)).toBe(0);
            });
             it('return 0 if any value is empty', () => {
                expect(noMilesDriver.returnMPHTrip(1)).toBe(0);
            });
        });
         describe('.returnTimeforTripinHours', () => {
            beforeEach(function(){
                badTime = new Driver('Carl');
            });
            it('return 0 if any value is undefined', () => {
                expect(badTime.returnTimeforTripinHours(undefined, 10)).toBe(0);
            });
            it('return 0 if any value is null', () => {
                expect(badTime.returnTimeforTripinHours(1, null)).toBe(0);
            });
             it('return 0 if any value is empty', () => {
                expect(badTime.returnTimeforTripinHours(1)).toBe(0);
            });

        });
        describe('.generateReport', () => {
            it('generate report for a driver with no miles', () => {
                noMilesDriver = new Driver('Carl');
                expect(noMilesDriver.MPHRecorded).toEqual([]);
                expect(noMilesDriver.MPHRecorded.length).toBe(0);
                expect(noMilesDriver.generateReport()).toBe('Carl: 0');
            });
        });
    });
});