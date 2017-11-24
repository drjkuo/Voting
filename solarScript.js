Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
code = fs.readFileSync('Solar.sol').toString();
solc = require('solc');
compiledCode = solc.compile(code);
abiDefinition = JSON.parse(compiledCode.contracts[':Solar'].interface);
SolarContract = web3.eth.contract(abiDefinition);
byteCode = compiledCode.contracts[':Solar'].bytecode;
deployedContract = SolarContract.new({data: byteCode, from: web3.eth.accounts[0], gas: 4700000});
contractInstance = SolarContract.at(deployedContract.address);


// contractInstance.sell(10, {from: web3.eth.accounts[1], value:web3.toWei(10, "ether"), gas:3000000})
// '0x60a9b567bd11d545933e16ee4c8877978a7e227675d7011514d6500a5dd8b592'
// contractInstance.buy(10, {from: web3.eth.accounts[2], value:web3.toWei(10, "ether"), gas:3000000})
// '0xf3b8fe2296c30c640414ea1bfae20fb4feff5dcc4d1f6836ef23a23e5dad5ba6'
// web3.eth.getBalance(web3.eth.accounts[1])
// { [String: '109999999999999769386'] s: 1, e: 20, c: [ 1099999, 99999999769386 ] }
// web3.eth.getBalance(web3.eth.accounts[2])
// { [String: '89999999999999969254'] s: 1, e: 19, c: [ 899999, 99999999969254 ] }
