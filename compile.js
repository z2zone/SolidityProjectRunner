const solc = require("solc");

// require('./Contracts/testing.sol');
// This require will not going to work well
// whenever we 'require' anything the node engine will try to execute the file as if it is javascript file.
// The node engine will complain that this code is not JS

// Rather than directly attempting to require the file, we need to read the contents of the file from our hard drive
// We need to use built in function libraries: Path and fs -> standard modules
const path = require("path");
// help us building a directory path from a current compile.js file.
// By using this path module, we are guranteed to get corss-platform compatibility -> Not a good idea to hard code the directory path.
const fs = require("fs"); //

const testingPath = path.resolve(__dirname, "Contracts", "testing.sol");
const content = fs.readFileSync(testingPath, "utf8");

module.exports = solc.compile(content, 1).contracts[":Inbox"];
