var contract;
var abi;
let accounts;
const activeGroups=[];
window.onload=initialize();

async function initialize() {
  await connectContract();
  accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
  groups=await contract.methods.getGroups().call();
  await getActiveGroups();
}
async function connectContract() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  await fetch('./Voting.json')
    .then(response => response.json()) // parse the response as JSON
    .then(data => {
        abi = data.abi; 
    })
    .catch(err => console.error(err));
  contract=await new web3.eth.Contract(abi, "0xD17aab14B0cBee37b305b4d87A7c6037DCdC2128"); // change this address every time you recompile/deploy
}
function getActiveGroups() {
  for (let i = 0; i < groups.length; i++) { // groups[i] iterates through each group in groups
    let group = groups[i];
    let members = group.members;
    for(let j = 0; j < members.length; j++) {
      if(members[j]==accounts[0]) {
        activeGroups.push(i);
        break;
      }
    } 
  }
}
async function vote() {
  await connectContract();
  let id;
  const candidates = document.getElementsByName('candidate')
  // Checks to see which if any candidate has been selected
  for (let i=0; i<candidates.length; i++) {
    if (candidates[i].checked) {
      id=i;
      break;
    }
  }
  const accounts = await web3.eth.getAccounts();
  // Votes for candidate if one has been selected 
  if (id!=null) {
    await contract.methods.vote(0, 0, id).send({from: accounts[0]});
    window.location.reload();
  }
}

/*
async function getVoteCount() {
  const count = await contract.getCount(voting.main_election.candidates);
  console.log(count);
}
*/