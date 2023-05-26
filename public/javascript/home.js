window.onload=initialize();

async function initialize() {
  displayElections();
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




