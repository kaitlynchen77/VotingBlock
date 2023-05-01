console.log(window.web3)
let web3Provider;
  // Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  web3Provider = window.web3.currentProvider;
  web3 = new Web3(window.web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to Ganache.
  web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
  web3 = new Web3(web3Provider);
}

import contractArtifact from "/build/Voting.json" assert { type: 'json'}; //produced by Truffle compile
const MyContract = TruffleContract(contractArtifact);
MyContract.setProvider(web3Provider);
const voting = getContract(MyContract)

async function getContract(MyContract) {
  const votingInstance = await MyContract.deployed();
  return votingInstance
}

export async function vote() {
  console.log('in vote() function')
  const accounts = await web3.eth.getAccounts();
  await voting.vote(0, { from: accounts[0] });
  window.location.reload()
}
