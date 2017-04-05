describe('root Tests', () => {
    var Driver = require('../Driver');
    var Root = require('../RootExecution');
    describe('general constructor and default parameter tests', ()=>{
        it('execution was ran with default input.txt', () => {
            var root = new Root();
            expect(root.fileName).toEqual('input.txt');
            expect(root.driverCollection).toEqual([]);
            expect(root.driverCollection).toEqual([]);
        });
        it('execution was ran with given input', () => {
            var root = new Root('test2.txt');
            expect(root.fileName).toEqual('test2.txt');
            expect(root.driverCollection).toEqual([]);
            expect(root.driverCollection).toEqual([]);
        });
    });
    describe('onLine functions', () => {
        it('onLine register Driver', ()=>{
            var root = new Root();
            var obj = [new Driver('Bob')];
            root.onLine('Driver Bob');
            expect(root.driverCollection).toEqual(obj);
        });
        it('onLine register a  to collection', ()=>{
            var root = new Root();
            root.onLine('Trip Dan 07:15 07:45 17.3');
            expect(root.unmatchedCollection).toEqual([['Trip', 'Dan', '07:15', '07:45', '17.3']]);
        });
        it('onLine register a trip', ()=>{
            var root = new Root();
            var obj = new Driver('Dan');
            obj.MPHRecorded = [39];
            obj.totalMiles = 13;

            root.onLine('Driver Dan');
            root.onLine('Trip Dan 06:12 06:32 12.9');
            obj.checkForEligibility('Dan', '06:12', '06:32', '12.9');
            expect(root.driverCollection).toEqual([obj]);
            expect(root.unmatchedCollection).toEqual([]);

        });
        it('onLine register unmatched driver', ()=>{
            var root = new Root();
            root.onLine('Trip Dan 06:12 06:32 12.9');
            expect(root.driverCollection).toEqual([]);
            expect(root.unmatchedCollection).toEqual([[ 'Trip', 'Dan', '06:12', '06:32', '12.9' ]]);
        });
    });
    // describe('onClose tests', () => {
    //     it('onclose ensure checkForEligibility is called', () =>{
    //         var root = new Root();
    //         var obj = new Driver('Dan');
    //         obj.MPHRecorded = [39];
    //         obj.totalMiles = 13;
    //         root.unmatchedCollection = [[obj]];
    //         root.driverCollection = [[obj]];
    //         spyOn(obj, 'checkForEligibility');
    //         spyOn(obj, 'generateReport').and.returnValue('lkafdljk');
    //         root.onClose();
    //         expect(obj.checkForEligibility).toHaveBeenCalled();
    //     });
    // });
    describe('addToCollection tests', () => {
        it('addToCollection update collection', ()=>{
            var root = new Root();
            root.addToCollection(root.driverCollection, 'matt');
            expect(root.driverCollection).toEqual(['matt']);
        });
    });
    
});