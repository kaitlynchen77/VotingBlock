
var contract;
var abi;
window.onload=displayElections();

async function connectContract() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  await fetch('./Voting.json')
    .then(response => response.json()) // parse the response as JSON
    .then(data => {
        abi = data.abi; 
    })
    .catch(err => console.error(err));
  contract=await new web3.eth.Contract(abi, "0x3E92Fe3b26595E3Cde8Ef0e2Bf6E6955e30e4497"); // change this address every time you recompile/deploy
}

async function displayElections() {
 // voting = await this.importContract();
  await connectContract();
  var groups=await contract.methods.getGroups().call();
  let yourGroups=document.getElementById('yourGroups')
  for (let i = 0; i < groups.length; i++) { // groups[i] iterates through each group in groups
    let group = groups[i];
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


