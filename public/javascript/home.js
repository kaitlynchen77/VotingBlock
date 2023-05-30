window.onload=initialize();

async function initialize() {
  await sharedInitialize();
  displayPolls();
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




