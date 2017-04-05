var Root = require('./RootExecution');
var root = new Root(process.argv[2]);
root.readFile();
