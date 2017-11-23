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

// > web3.eth.accounts[0]
// '0x2d869f300b084bf19626423c19b6da8873845a77'
// > web3.eth.getBalance('0x2d869f300b084bf19626423c19b6da8873845a77')
// { [String: '99999999999995013137'] s: 1, e: 19, c: [ 999999, 99999995013137 ] }
// > contractInstance.sell("10", {from: web3.eth.accounts[1], gas:3000000})
// '0xf7c148635ac2851e05e04f2098b8a7caa0ed5c1011762f76e92329cd708b018f'
// > contractInstance.buy("10", {from: web3.eth.accounts[2], gas:3000000})
// '0x0b4839742c79cb33b7adbe3ca46fc54944c8ad1d122b306962f292a8207e1e76'
// > web3.eth.getBalance(web3.eth.accounts[1])
// { [String: '99999999999999845999'] s: 1, e: 19, c: [ 999999, 99999999845999 ] }
// > web3.eth.getBalance(web3.eth.accounts[2])
// { [String: '99999999999999944217'] s: 1, e: 19, c: [ 999999, 99999999944217 ] }
// > web3.eth.getBalance(web3.eth.accounts[1])
