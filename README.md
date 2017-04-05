## Setup up
Developed using nodev6.10.0
npm install should install needed dependencies for tests

## Running
From CLI run
`node init` -this will use a default parameter and use 'input.txt' that was included with the project

'node init <file name>' - will run with given input file

## Testing
`jasmine` will run the unit tests
NOTE: if jasmine doesn't work you might need to install it globally

## Approach to problem

I decided to use a class approach to this problem. To me a `Driver` class made a lot of sense to me. Each driver should be unique so I could encapsulate all the needed functions and data in a single class per driver. The constructor function registers a name most importantly and gives us some starting values for MPHRecorded and totalMiles. Each time we read a line that started with Driver we instantiate a new driver. 

The RootExecution class handles our file reading. We only parse the file once so with each line we handle if it is a 'Trip' or 'Driver'. 'Driver' we register like mentioned earlier and it to an array called driverCollection. 'Trip' will check to see if the driver was already registered and if it was we run an eligibilty check which checks the business logic and records the drive(adds total miles to the running total and pushs the mph to all the mph array). If we don't have a match we add it an unmatched collection. After we have read all the lines we take the unmatched collection and check it against our registered drivers again to see if the driver was registered after the trip was recorded and then we do our eligibilty check again. 

After all this is done we do our reporting. We first sort our driverCollection in order of miles and calculate the average mph and determine what the final string would be.

General design notes are I went with this class design to make testing easier. In hindsight RootExecution could get away with not being a class, but I thought it made it a little more readable and testable. I would refactor the onClose to be more testable. For some reason mocks were not playing nicely with mocking drivers, so ensuring certain functions were called correctly was tough.