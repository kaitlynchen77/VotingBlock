window.onload = initialize();

async function initialize() {
  await renderBallots();
}

async function vote(group, election) { // group, election are numbers
  let id;
  const candidates = document.getElementsByName('candidates' + group + ',' + election)
  // Checks to see which if any candidate has been selected
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].checked) {
      id = i;
      break;
    }
  }
  const accounts = await web3.eth.getAccounts();
  // Votes for candidate if one has been selected 
  if (id != null) {
    await contract.methods.vote(group, election, id).send({ from: accounts[0] });
    window.location.reload();
  }
}

function renderBallots() {
  const ballots = document.querySelector("#ballots");
  //iterate through groups (vertically spaced)
  for (let i = 0; i < activeGroups.length; i++) {
    //iterate through elections (horizontally spaced)
    for (let j = 0; j < groups[activeGroups[i]].elections.length; j++) {
      // print group
      let voted = groups[activeGroups[i]].elections[j].voted;
      let k = 0;
      for(; k < voted.length; k++) { //only displays elections that user has not voted in
        if(voted[k]==accounts[0]) {
          break;
        }
      }
      if(k==voted.length) {
        ballots.innerHTML += "<div id='group" + activeGroups[i] + "election" + j + "'>  </div>";
        const ballot = document.querySelector('#group' + activeGroups[i] + 'election' + j);
        //iterate through candidates
        for (let k = 0; k < groups[activeGroups[i]].elections[j].candidates.length; k++) {
          ballot.innerHTML += `
          <div>
            <label>
              <input type="radio" name="candidates${activeGroups[i]},${j}" value="${k}" />
              ${groups[activeGroups[i]].elections[j].candidates[k].name}
            </label>
          </div>
`         ;
        } // if no elections, print this
        ballot.innerHTML += `
        <div>
          <button onclick="vote(${activeGroups[i]},${j});">VOTE</button>
        </div>`
      }
    }
  }
}