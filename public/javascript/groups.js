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
  groupsDropdown();
}

async function connectContract() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  await fetch('./Voting.json')
    .then(response => response.json()) // parse the response as JSON
    .then(data => {
        abi = data.abi; 
    })
    .catch(err => console.error(err));
  contract = await new web3.eth.Contract(abi, "0x5C3a41E1E8BD6e466A036a75f8772da4e04170B7"); // change this address every time you recompile/deploy
}

function getActiveGroups() { // all groups that the user is the admin of 
  for (let i = 0; i < groups.length; i++) { // groups[i] iterates through each group in groups
    if(groups[i].adminAddress==accounts[0]) {
      activeGroups.push(i);
    }
  }
}
async function createGroup() {
  let name = document.getElementById('group-title').value
  await contract.methods.createGroup(name).send({from: accounts[0], gas: '1000000'})
  window.location.reload();
}
async function createElection() {
  const groupID = document.getElementById('group-ID').value
  const title = document.getElementById('election-title').value
  const accounts = await web3.eth.getAccounts();
  await contract.methods.createElection(parseInt(groupID), title).send({ from: accounts[0] });
  window.location.reload();
}
function groupsDropdown() {
  dropdownOptions = document.getElementById("dropdownOptions");
  for(let i = 0; i < activeGroups.length; i++) {
    dropdownOptions.innerHTML += "<option value=___>"+groups[activeGroups[i]].groupTitle+"</option>";
  }
}

async function removeMember() {
  const member_address = document.getElementById('remove-member-address').value
  const groupID = 0; //change when there are multiple groups
  const accounts = await web3.eth.getAccounts();
  await contract.methods.removeMember(groupID, member_address).send({ from: accounts[0] });
}

async function addMember() {
  const member_address = document.getElementById('add-member-address').value
  const groupID = 0; //change when there are multiple groups
  const accounts = await web3.eth.getAccounts();
  await contract.methods.addMember(groupID, member_address).send({ from: accounts[0] });
}

// display all groups that user is the admin of, for each provide add member + remove member + create election functionality
