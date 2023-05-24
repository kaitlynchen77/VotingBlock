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
  // Is there an injected web3 instance?
  if (typeof web3 !== 'undefined') {
    console.log(typeof web3);
    web3Provider = window.web3.currentProvider;
    web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log('metamask not injected')
    // If no injected web3 instance is detected, fallback to Ganache.
    web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
    web3 = new Web3(web3Provider);
  } 
  await connectContract();
  accounts = await web3.eth.getAccounts();
  groups=await contract.methods.getGroups().call();
  await getActiveGroups();
  groupsDropdown();
  updatePage();
}
async function connectContract() {
  await fetch('./Voting.json')
    .then(response => response.json()) // parse the response as JSON
    .then(data => {
      abi = data.abi;
    })
    .catch(err => console.error(err));
  contract = await new web3.eth.Contract(abi, "0x1C4BCc6a0C5Aadd8E370c9AD9999dce1fdF05679"); // change this address every time you recompile/deploy
}

function getActiveGroups() { // all groups that the user is the admin of 
  for (let i = 0; i < groups.length; i++) { // groups[i] iterates through each group in groups
    if(groups[i].adminAddress==accounts[0]) {
      activeGroups.push(i);
    }
  }
}
async function createGroup() {
  let name = document.getElementById('group-title').value;
  let i = 0;
  for(; i < groups.length; i++) {
    if(groups[i].groupTitle==name) {
      alert("A group with this name already exists.");
      break;
    }
  }
  if(i == groups.length) {
    await contract.methods.createGroup(name).send({from: accounts[0], gas: '1000000'})
    window.location.reload();
  }
}
async function createElection() {
  const groupID =groupSelection;
  const title = document.getElementById('election-title').value;
  elections=groups[groupID].elections;
  let i = 0;
  for(; i < elections.length; i++) {
    if(elections[i].electionTitle==title) {
      alert("An election with this name already exists.");
      break;
    }
  }
  if(i==elections.length) {
    await contract.methods.createElection(parseInt(groupID), title).send({ from: accounts[0] });
    window.location.reload();
  }
}
async function removeMember() {
  const member_address = document.getElementById('memberOptions').value;
  const groupID = groupSelection;   const accounts = await web3.eth.getAccounts();
  await contract.methods.removeMember(groupID, member_address).send({ from: accounts[0]});
  window.location.reload();
}

async function addMember() { 
  const member_address = document.getElementById('add-member-address').value;
  if (!web3.utils.isAddress(member_address)) {
    alert('Invalid Ethereum address');
  } else {
    const groupID =groupSelection;
    let members = groups[groupID].members;
    let i = 0;
    for(; i < members.length;i++) {
      if(members[i]==member_address) {
        alert('This address is already in the group');
        break;
      }
    }
    if(i==members.length) {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.addMember(groupID, member_address).send({ from: accounts[0]});
      window.location.reload();
    }
  }

}
async function endElection() {
  groupIndex=groupSelection;
  electionIndex=Number(electionOptions.value);
  await contract.methods.endElection(groupIndex,electionIndex).send({ from: accounts[0],gas:1000000}); 
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
  let elections=groups[groupSelection].elections; // this appears multiple times throughout the code
  let members=groups[groupSelection].members;
  electionOptions = document.getElementById("electionOptions");
  electionOptions.innerHTML="";
  for(let i = 0; i < elections.length; i++) {
    electionOptions.innerHTML+="<option value='"+i+"'>"+elections[i].electionTitle+"</option>";
  }
  memberOptions = document.getElementById("memberOptions");
  memberOptions.innerHTML="";
  for(let i = 1; i < members.length; i++) { // i starts at 1 because we do not want to include the admin themself
    memberOptions.innerHTML+="<option value='"+members[i]+"'>"+members[i]+"</option>";
  }
}


// display all groups that user is the admin of, for each provide add member + remove member + create election functionality
