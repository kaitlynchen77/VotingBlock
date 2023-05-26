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
  groups = await contract.methods.getGroups().call();
  console.log(groups);
  await getActiveGroups();
  await rendercurrent();
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

function rendercurrent() {
    const current = document.querySelector("#current_elections");
    const past = document.querySelector("#past_elections");

    //iterate through groups (vertically spaced)
    for (let i = 0; i < activeGroups.length; i++) {
      //iterate through elections (horizontally spaced)
      for (let j = 0; j < groups[activeGroups[i]].elections.length; j++) {
          current.innerHTML += "<div id='c_group" + activeGroups[i] + "election" + j + "'>  </div>";
          console.log("candidates 1")
          console.log(groups[activeGroups[i]].elections[j].candidates)

            const c_ballot = document.querySelector('#c_group' + activeGroups[i] + 'election' + j);
            c_ballot.innerHTML += `<h4>${groups[activeGroups[i]].elections[j].electionTitle}</h4>`;

                //iterate through candidates
                for (let b = 0; b < groups[activeGroups[i]].elections[j].candidates.length; b++) {
                    
                    c_ballot.innerHTML += `
                  <div>
                    <label>
                      ${groups[activeGroups[i]].elections[j].candidates[b].name} -- ${groups[activeGroups[i]].elections[j].candidates[b].voteCount}
                    </label>
                  </div>
        `         ;
                    
                }
          if (groups[activeGroups[i]].elections[j].candidates.length == 0) {
            c_ballot.innerHTML += `
                <div>
                <label>
                    no candidates in this election
                </label>
                </div>
  `         ;
            }
      }
        
      for (let j = 0; j < groups[activeGroups[i]].completed.length; j++) {
        past.innerHTML += "<div id='p_group" + activeGroups[i] + "election" + j + "'>  </div>";
        const p_ballot = document.querySelector('#p_group' + activeGroups[i] + 'election' + j);
        //iterate through candidates
        p_ballot.innerHTML += `<h4>${groups[activeGroups[i]].completed[j].electionTitle}</h4>`;
          console.log("candidates 2")
          console.log(groups[activeGroups[i]].completed[j].candidates)
          for (let b = 0; b < groups[activeGroups[i]].completed[j].candidates.length; b++) {
            p_ballot.innerHTML += `
          <div>
            <label>
              ${groups[activeGroups[i]].completed[j].candidates[b].name} -- ${groups[activeGroups[i]].completed[j].candidates[b].voteCount}
            </label>
          </div>
`         ;
          }
          if (groups[activeGroups[i]].completed[j].candidates.length == 0) {
            c_ballot.innerHTML += `
                <div>
                <label>
                    no candidates in this election
                </label>
                </div>
  `         ;
            }
}
    }
  }