window.onload = initialize();

async function initialize() {
  await rendercurrent();
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