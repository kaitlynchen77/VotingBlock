var contract;
var abi;
let groups;
let accounts;
const activeGroups=[];
window.onload=initialize();

async function initialize() {
  await connectContract();
  accounts = await web3.eth.getAccounts();
  groups=await contract.methods.getGroups().call();
  await getActiveGroups();
  console.log(groups);
}

async function connectContract() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  await fetch('./Voting.json')
    .then(response => response.json()) // parse the response as JSON
    .then(data => {
        abi = data.abi; 
    })
    .catch(err => console.error(err));
  contract = await new web3.eth.Contract(abi, "0x5E96B53f5F2F9B6224644d09641E63c88fC398cC"); // change this address every time you recompile/deploy
}

function getActiveGroups() {
  for (let i = 0; i < groups.length; i++) { // groups[i] iterates through each group in groups
    if(groups[i].adminAddress==accounts[0]) {
      activeGroups.push(i);
    }
  }
}
async function createGroup(name) {
  await contracts.methods.createGroup(name).send({from: accounts[0]})
  window.location.reload();
}
async function createElection() {
  const groupID = document.getElementById('group-ID').value
  const title = document.getElementById('election-title').value
  const accounts = await web3.eth.getAccounts();
  await contract.methods.createElection(parseInt(groupID), title).send({ from: accounts[0] });
  window.location.reload();
}

// display all groups that user is the admin of, for each provide add member + remove member + create election functionality