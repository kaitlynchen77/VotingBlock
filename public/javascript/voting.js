let web3Provider;
let voting;
// getVoteCount()
// Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  web3Provider = window.web3.currentProvider;
  web3 = new Web3(window.web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to Ganache.
  web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
  web3 = new Web3(web3Provider);
}

// importing compiled contract
let contractArtifact;
fetch('/voting.json')
  .then(response => response.json())
  .then(contractArtifact => {
    const MyContract = TruffleContract(contractArtifact);
    MyContract.setProvider(web3Provider);
    getContract(MyContract)
    .then(contract => voting=contract)
  })
  .catch(error => console.error(error));

async function getContract(MyContract) {
  let votingInstance = await MyContract.deployed();
  return votingInstance;
}

async function vote() {
  let id;
  const candidates = document.getElementsByName('candidate')
  // Checks to see which if any candidate has been selected
  for (let i=0; i<candidates.length; i++) {
    if (candidates[i].checked) {
      id=candidates[i].value;
      break;
    }
  }
  const accounts = await web3.eth.getAccounts();
  // Votes for candidate if one has been selected 

  if (id) {
    const election = await voting.main_election;
    console.log(election)
    await voting.vote(id, election, { from: accounts[0] });
    window.location.reload();
  }
}

async function getVoteCount() {
  const count = await voting.getCount(voting.main_election.candidates);
  console.log(count);
}