let groupSelection;
let activeGroups2=[];
let numOptions = 2;

window.onload = intialize();

// slight lag for hiding divs

async function intialize() {
  await sharedInitialize();
  await getActiveGroups2();
  const pollOptions = document.getElementById("pollOptions");
  const memberOptions = document.getElementById("memberOptions");
  groupsDropdown();
  updatePage();
}
function getActiveGroups2() { // all groups that the user is the admin of 
  for (let i = 0; i < activeGroups.length; i++) { // groups[i] iterates through each group in groups
    if (groups[activeGroups[i]].adminAddress == accounts[0]) {
      activeGroups2.push(activeGroups[i]);
    }
  }
}
async function createGroup() {
  let name = document.getElementById('group-title').value;
  let i = 0;
  for (; i < groups.length; i++) {
    if (groups[i].groupTitle == name) {
      alert("A group with this name already exists.");
      break;
    }
  }
  if (i == groups.length) {
    await contract.methods.createGroup(name).send({ from: accounts[0], gas: '1000000' })
    window.location.reload();
  }
}

async function createPoll() {
  console.log('createPoll');
  // const groupID = document.getElementById('group-ID').value;
  const groupID = groupSelection;
  const title = document.getElementById('poll-title').value;

  // check if duplicate title
  polls = groups[groupID].polls;
  let i = 0;
  for (; i < polls.length; i++) {
    if (polls[i].pollTitle == title) {
      alert("A poll with this name already exists.");
      window.location.reload() // might need to come back to fix this if it reloads before user can read alert
    }
  }

  //load options
  const optionElements = document.getElementsByName('option')
  let options = [];
  
  for (let i = 0; i < optionElements.length; i++) {
    console.log(optionElements[i].value)
    options.push(optionElements[i].value)
  }

  const accounts = await web3.eth.getAccounts();
  console.log(options)
  await contract.methods.createPoll(parseInt(groupID), title, options).send({ from: accounts[0] });
  window.location.reload();
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
async function endPoll() {
  groupIndex=groupSelection;
  pollIndex=Number(pollOptions.value);
  await contract.methods.endPoll(groupIndex,pollIndex).send({ from: accounts[0],gas:1000000}); 
  window.location.reload();
}

function groupsDropdown() {
  // display all groups that user is the admin of, for each provide add member + remove member + create poll functionality
  const groupOptions = document.getElementById("groupOptions");
  if (activeGroups2.length == 0) {
    document.getElementById("manageGroups").style.display = "none";
  } else {
    for (let i = 0; i < activeGroups2.length; i++) {
      groupOptions.innerHTML += "<option value='" + i + "'>" + groups[activeGroups2[i]].groupTitle + "</option>";
    }
  }
}
function updatePage() {
  if(activeGroups2.length>0) {
    groupSelection = Number(groupOptions.value);
    let polls = groups[groupSelection].polls; // this appears multiple times throughout the code
    let members = groups[groupSelection].members;
    pollOptions.innerHTML = "";
    if (polls.length == 0) {
      document.getElementById("endPoll").style.display = "none";
    } else {
      for (let i = 0; i < polls.length; i++) {
        pollOptions.innerHTML += "<option value='" + i + "'>" + polls[i].pollTitle + "</option>";
      }
    }
    memberOptions.innerHTML = "";
    if (members.length == 1) {
      document.getElementById("removeMember").style.display = "none";
    } else {
      for (let i = 1; i < members.length; i++) { // i starts at 1 because we do not want to include the admin themself
        memberOptions.innerHTML += "<option value='" + members[i] + "'>" + members[i] + "</option>";
      }
    }
  }
  
}

function addOption() {
  let additionalFields = document.getElementById('additional-option-fields');
  numOptions++;

  // Create the new input element
  let newOptionInput = document.createElement('input');
  newOptionInput.type = 'text';
  newOptionInput.id = `option-name${numOptions}`;
  newOptionInput.name = 'option';
  newOptionInput.placeholder = `option ${numOptions}`;
  newOptionInput.value = '';

  // Create the label element
  let label = document.createElement('label');
  label.appendChild(newOptionInput);

  // Create the div element
  let div = document.createElement('div');
  div.appendChild(label);

  // Append the new option field to the additional fields container
  additionalFields.appendChild(div);
}



