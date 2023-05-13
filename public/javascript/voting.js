var contract;
var abi;

async function connectContract() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  await fetch('./Voting.json')
    .then(response => response.json()) // parse the response as JSON
    .then(data => {
        abi = data.abi; 
    })
    .catch(err => console.error(err));
  contract=await new web3.eth.Contract(abi, "0x56D254835Deb060e80e2384F40A404Aa8250Bc3a"); // change this address every time you recompile/deploy
}

async function vote() {
  await connectContract();
  let id;
  const candidates = document.getElementsByName('candidate')
  // Checks to see which if any candidate has been selected
  for (let i=0; i<candidates.length; i++) {
    if (candidates[i].checked) {
      id=i;
      break;
    }
  }
  const accounts = await web3.eth.getAccounts();
  // Votes for candidate if one has been selected 
  if (id!=null) {
    await contract.methods.vote(0, 0, id).send({from: accounts[0]});
    window.location.reload();
  }
}

 /*
async function getActiveGroups() {
  await connectContract(); // incorporate into window.onload
  let groups=await contract.methods.getGroups().call();
  const accounts = await web3.eth.getAccounts();
  for(let i = 0; i < groups.length; i++) {
    members = groups[i].members;
    for(let j = 0; j < members.length; j++) {
      if(members[j]==accounts[0]) {
        validGroups.push(i);
        break;
      }
    }
  }
}
*/
/*
async function getVoteCount() {
  const count = await contract.getCount(voting.main_election.candidates);
  console.log(count);
}
*/