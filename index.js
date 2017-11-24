web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// update API for solar
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance =  VotingContract.at('0xb5882d8064351c24916bb089af8f89eae71b03e2');
candidates = {"0": "candidate-0", "1": "candidate-1", "2": "candidate-2", "3": "candidate-3", "4": "candidate-4"
}

// function voteForCandidate() {
//   candidateName = $("#candidate").val();
//   contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[1]}, function() {
//     let div_id = candidates[candidateName];
//     $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
//   });
// }

function tradeSolar() {
  contractInstance.buy(10, {from: web3.eth.accounts[2], value:web3.toWei(10, "ether"), gas:3000000});
  contractInstance.sell(10, {from: web3.eth.accounts[1], value:web3.toWei(10, "ether"), gas:3000000});
}



$(document).ready(function() {
  // candidateNames = Object.keys(candidates);
  // for (var i = 0; i < candidateNames.length; i++) {
  //   let name = candidateNames[i];
  //   let val = contractInstance.totalVotesFor.call(name).toString()
  //   $("#" + candidates[name]).html(val);
  // }
  candidateNames = [0,1,2,3,4,5,6,7,8,9];
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    // let val = contractInstance.totalVotesFor.call(name).toString()
    let address = web3.eth.accounts[i];
    $("#" + candidates[name]).html(address);
    let ether = web3.eth.getBalance(address).c[0];
    $("#" + "ethers-" + name).html(ether);
  }
});
