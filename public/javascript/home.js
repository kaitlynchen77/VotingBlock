
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
  displayPolls();
}

async function connectContract() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  await fetch('./Voting.json')
    .then(response => response.json()) // parse the response as JSON
    .then(data => {
        abi = data.abi; 
    })
    .catch(err => console.error(err));
  contract = await new web3.eth.Contract(abi, "0x05cC7c8bfA02dDa3e80213F64C36994495bb17aD"); // change this address every time you recompile/deploy
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

function displayPolls() {
  let yourGroups=document.getElementById('yourGroups')
  for (let i = 0; i < activeGroups.length; i++) { // groups[i] iterates through each group in groups
    let group = groups[activeGroups[i]];
    yourGroups.innerHTML+="<br>Group Name: " + group[0];
    let polls = group[1];
    for(let k = 0; k < polls.length; k++) {
      let poll=polls[k];
      yourGroups.innerHTML+="<br>Poll Name: " + poll[0];
      let options=poll[1];
      for(let l = 0; l < options.length; l++) {
        let option=options[l];
        yourGroups.innerHTML+="<br>Option Name: " + option[0];
        yourGroups.innerHTML+="<br>Option Vote Count: " + option[1];
      }
    }
  }
}


