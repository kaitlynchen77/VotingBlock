
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
  displayElections();
}

async function connectContract() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  await fetch('./Voting.json')
    .then(response => response.json()) // parse the response as JSON
    .then(data => {
        abi = data.abi; 
    })
    .catch(err => console.error(err));
  contract = await new web3.eth.Contract(abi, "0xf7682402181D4c95272d9C78178Ddd9e798E581b"); // change this address every time you recompile/deploy
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

function displayElections() {
  let yourGroups=document.getElementById('yourGroups')
  for (let i = 0; i < activeGroups.length; i++) { // groups[i] iterates through each group in groups
    let group = groups[activeGroups[i]];
    yourGroups.innerHTML+="<br>Group Name: " + group[0];
    let elections = group[1];
    for(let k = 0; k < elections.length; k++) {
      let election=elections[k];
      yourGroups.innerHTML+="<br>Election Name: " + election[0];
      let candidates=election[1];
      for(let l = 0; l < candidates.length; l++) {
        let candidate=candidates[l];
        yourGroups.innerHTML+="<br>Candidate Name: " + candidate[0];
        yourGroups.innerHTML+="<br>Candidate Vote Count: " + candidate[1];
      }
    }
  }
}


