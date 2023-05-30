var contract;
var abi;
let accounts;
let groups;
let web3Provider;
const activeGroups = [];


window.onload = initialize();



async function initialize() {
  
  // Is there an injected web3 instance?
  if (typeof web3 !== 'undefined') {
    console.log('metamask injected')
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
  groups = await contract.methods.getGroups().call();
  await getActiveGroups();
  await renderBallots();
}
async function connectContract() {
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
    for (let j = 0; j < members.length; j++) {
      if (members[j] == accounts[0]) {
        activeGroups.push(i);
        break;
      }
    }
  }
}
async function vote(group, poll) { // group, poll are numbers
  let id;
  const options = document.getElementsByName('options' + group + ',' + poll)
  // Checks to see which if any option has been selected
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      id = i;
      break;
    }
  }
  const accounts = await web3.eth.getAccounts();
  // Votes for option if one has been selected 
  if (id != null) {
    await contract.methods.vote(group, poll, id).send({ from: accounts[0] });
    window.location.reload();
  }
}

function renderBallots() {
  const ballots = document.querySelector("#ballots");
  //iterate through groups (vertically spaced)
  for (let i = 0; i < activeGroups.length; i++) {
    //iterate through polls (horizontally spaced)
    for (let j = 0; j < groups[activeGroups[i]].polls.length; j++) {
      let voted = groups[activeGroups[i]].polls[j].voted;
      let k = 0;
      for(; k < voted.length; k++) { //only displays polls that user has not voted in
        if(voted[k]==accounts[0]) {
          break;
        }
      }
      if(k==voted.length) {
        ballots.innerHTML += "<div id='group" + activeGroups[i] + "poll" + j + "'>  </div>";
        const ballot = document.querySelector('#group' + activeGroups[i] + 'poll' + j);
        //iterate through options
        for (let k = 0; k < groups[activeGroups[i]].polls[j].options.length; k++) {
          ballot.innerHTML += `
          <div>
            <label>
              <input type="radio" name="options${activeGroups[i]},${j}" value="${k}" />
              ${groups[activeGroups[i]].polls[j].options[k].name}
            </label>
          </div>
`         ;
        }
        ballot.innerHTML += `
        <div>
          <button onclick="vote(${activeGroups[i]},${j});">VOTE</button>
        </div>`
      }
    }
  }
}