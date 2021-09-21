const assert = require("assert");
const ganache = require("ganache-cli");
const { bytecode, interface } = require("../compile");
const Web3 = require("web3");
// Web3 is capitalized because we are importing constructor function from web3.
// It creates instances of web3 libraries. By convention, we capitalize if we work with the class.
const web3 = new Web3(ganache.provider());
// lower case means that we are using a new instance created by the constructor function.

let accounts;
let testContract;

beforeEach(async () => {
  // Retrieve unlocked accounts provided from ganache network.
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  testContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hello World"],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
});

describe("testing", () => {
  it("deployed a contract", () => {
    assert.ok(testContract.options.address);
  });

  it("Contains default message", async () => {
    const message = await testContract.methods.message().call();
    assert.equal(message, "Hello World");
  });

  it("Sets a new message properly", async () => {
    await testContract.methods
      .setMessage("Gimme Power")
      .send({ from: accounts[0] });
    const newMessage = await testContract.methods.message().call();
    assert.equal(newMessage, "Gimme Power");
  });
});
