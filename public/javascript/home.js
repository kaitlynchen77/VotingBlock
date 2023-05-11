
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
  contract=await new web3.eth.Contract(abi, "0x3d0A114766c4675f8cB5d675561AeF0cb2b71089"); // change this address every time you recompile/deploy
}

async function displayElections() {
 // voting = await this.importContract();
  await connectContract();
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
  let groups=await contract.methods.getGroups().call();
  let yourGroups=document.getElementById('yourGroups')
  for (let i = 0; i < groups.length; i++) { // groups[i] iterates through each group in groups
    let group = groups[i];
    let members = group.members;
    for(let j = 0; j < members.length; j++) {
      if(members[j]==accounts[0]) {
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
        break;
      }
    }
    
  }
}


