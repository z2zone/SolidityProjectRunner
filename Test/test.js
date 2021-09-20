const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
// Web3 is capitalized because we are importing constructor function from web3.
// It creates instances of web3 libraries. By convention, we capitalize if we work with the class.
const web3 = new Web3(ganache.provider());
// lower case means that we are using a new instance created by the constructor function.
