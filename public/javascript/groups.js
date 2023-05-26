let groupSelection;
let activeGroups2=[];

// on page reload, add banner at the top that says what action has just been completed
// error if user is not logged in to metamask

// lag for hiding divs

async function initialize() {
  await getActiveGroups2();
  const electionOptions = document.getElementById("electionOptions");
  const memberOptions = document.getElementById("memberOptions");
  groupsDropdown();
  updatePage();
}
function getActiveGroups2() { // all groups that the user is the admin of 
  for (let i = 0; i < activeGroups.length; i++) { // groups[i] iterates through each group in groups
    if(groups[activeGroups[i]].adminAddress==accounts[0]) {
      activeGroups2.push(activeGroups[i]);
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
  const groupOptions=document.getElementById("groupOptions");
  if(activeGroups2.length==0) {
    document.getElementById("manageGroups").style.display="none";
  } else {
    for(let i = 0; i < activeGroups2.length; i++) {
      groupOptions.innerHTML += "<option value='"+i+"'>"+groups[activeGroups2[i]].groupTitle+"</option>";
    }
  }
}
function updatePage() {
  groupSelection=Number(groupOptions.value);
  let elections=groups[groupSelection].elections; // this appears multiple times throughout the code
  let members=groups[groupSelection].members;
  electionOptions.innerHTML="";
  if(elections.length==0) {
    document.getElementById("endElection").style.display="none";
  } else {
    for(let i = 0; i < elections.length; i++) {
      electionOptions.innerHTML+="<option value='"+i+"'>"+elections[i].electionTitle+"</option>";
    }
  }
  memberOptions.innerHTML="";
  if(members.length==1) {
    document.getElementById("removeMember").style.display="none";
  } else {
    for(let i = 1; i < members.length; i++) { // i starts at 1 because we do not want to include the admin themself
      memberOptions.innerHTML+="<option value='"+members[i]+"'>"+members[i]+"</option>";
    }
  }
}

