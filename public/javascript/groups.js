var contract;
var abi;
let groups;
let accounts;
const activeGroups=[];
window.onload=initialize();
let groupOptions;
let groupSelection;
let electionOptions;
let memberOptions;

// on page reload, add banner at the top that says what action has just been completed

async function initialize() {
  await connectContract();
  accounts = await web3.eth.getAccounts();
  groups=await contract.methods.getGroups().call();
  await getActiveGroups();
  groupsDropdown();
  updatePage();
}

async function connectContract() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  await fetch('./Voting.json')
    .then(response => response.json()) // parse the response as JSON
    .then(data => {
        abi = data.abi; 
    })
    .catch(err => console.error(err));
  contract = await new web3.eth.Contract(abi, "0xa7b10C35BDea6831b189Fed8e4Dffc7E1d49ca19"); // change this address every time you recompile/deploy
}

function getActiveGroups() { // all groups that the user is the admin of 
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
  const groupID =groupSelection;
  const title = document.getElementById('election-title').value
  const accounts = await web3.eth.getAccounts();
  await contract.methods.createElection(parseInt(groupID), title).send({ from: accounts[0] });
  window.location.reload();
}
async function removeMember() {
  const member_address = document.getElementById('memberOptions').value;
  const groupID = groupSelection; //change when there are multiple groups
  const accounts = await web3.eth.getAccounts();
  await contract.methods.removeMember(groupID, member_address).send({ from: accounts[0]});
  window.location.reload();
}

async function addMember() {
  const member_address = document.getElementById('add-member-address').value;
  if (!web3.utils.isAddress(member_address)) {
    alert('Invalid Ethereum address'); // implement alert to user
  } else {
    const groupID =groupSelection;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addMember(groupID, member_address).send({ from: accounts[0]});
    window.location.reload();
  }
}
async function endElection() {
  groupIndex=groupSelection;
  electionIndex=Number(electionOptions.value);
  await contract.methods.endElection(groupIndex,electionIndex).send({ from: accounts[0],gas:3000000}); 
  window.location.reload();
}
function groupsDropdown() {
  groupOptions=document.getElementById("groupOptions");
  for(let i = 0; i < activeGroups.length; i++) {
    groupOptions.innerHTML += "<option value='"+i+"'>"+groups[activeGroups[i]].groupTitle+"</option>";
  }
}
function updatePage() {
  groupSelection=Number(groupOptions.value);
  elections=groups[groupSelection].elections;
  members=groups[groupSelection].members;
  electionOptions = document.getElementById("electionOptions");
  for(let i = 0; i < elections.length; i++) {
    electionOptions.innerHTML+="<option value='"+i+"'>"+elections[i].electionTitle+"</option>";
  }
  memberOptions = document.getElementById("memberOptions");
  for(let i = 1; i < members.length; i++) { // i starts at 1 because we do not want to include the admin themself
    memberOptions.innerHTML+="<option value='"+members[i]+"'>"+members[i]+"</option>";
  }
}


// display all groups that user is the admin of, for each provide add member + remove member + create election functionality
