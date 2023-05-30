window.onload = initialize();

async function initialize() {
  await sharedInitialize();
  await renderBallots();
}

async function vote(group, poll) { // group, election are numbers
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
    window.location.reload(); // quite a bit of lag here, although for some reason this isn't the case for any of the functions in groups.js
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
        } // if no elections, print this
        ballot.innerHTML += `
        <div>
          <button onclick="vote(${activeGroups[i]},${j});">VOTE</button>
        </div>`
      }
    }
  }
}