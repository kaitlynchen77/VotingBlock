window.onload = initialize();

async function initialize() {
  await sharedInitialize();
  await rendercurrent();
}
function rendercurrent() {
    const current = document.querySelector("#current_polls");
    const past = document.querySelector("#past_polls");

    //iterate through groups (vertically spaced)
    for (let i = 0; i < activeGroups.length; i++) {
      //iterate through polls (horizontally spaced)
      for (let j = 0; j < groups[activeGroups[i]].polls.length; j++) {
          current.innerHTML += "<div id='c_group" + activeGroups[i] + "poll" + j + "'>  </div>";
          console.log("options 1")
          console.log(groups[activeGroups[i]].polls[j].options)

            const c_ballot = document.querySelector('#c_group' + activeGroups[i] + 'poll' + j);
            c_ballot.innerHTML += `<h4>${groups[activeGroups[i]].polls[j].pollTitle}</h4>`;

                //iterate through options
                for (let b = 0; b < groups[activeGroups[i]].polls[j].options.length; b++) {
                    
                    c_ballot.innerHTML += `
                  <div>
                    <label>
                      ${groups[activeGroups[i]].polls[j].options[b].name} -- ${groups[activeGroups[i]].polls[j].options[b].voteCount}
                    </label>
                  </div>
        `         ;
                    
                }
          if (groups[activeGroups[i]].polls[j].options.length == 0) {
            c_ballot.innerHTML += `
                <div>
                <label>
                    no options in this poll
                </label>
                </div>
  `         ;
            }
      }
        
      for (let j = 0; j < groups[activeGroups[i]].completed.length; j++) {
        past.innerHTML += "<div id='p_group" + activeGroups[i] + "poll" + j + "'>  </div>";
        const p_ballot = document.querySelector('#p_group' + activeGroups[i] + 'poll' + j);
        //iterate through options
        p_ballot.innerHTML += `<h4>${groups[activeGroups[i]].completed[j].pollTitle}</h4>`;
          console.log("options 2")
          console.log(groups[activeGroups[i]].completed[j].options)
          for (let b = 0; b < groups[activeGroups[i]].completed[j].options.length; b++) {
            p_ballot.innerHTML += `
          <div>
            <label>
              ${groups[activeGroups[i]].completed[j].options[b].name} -- ${groups[activeGroups[i]].completed[j].options[b].voteCount}
            </label>
          </div>
`         ;
          }
          if (groups[activeGroups[i]].completed[j].options.length == 0) {
            c_ballot.innerHTML += `
                <div>
                <label>
                    no options in this poll
                </label>
                </div>
  `         ;
            }
}
    }
  }