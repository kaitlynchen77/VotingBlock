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
  contract=await new web3.eth.Contract(abi, "0xC12E83f168967Da8fe18DD391a3205Ff19c61366"); // change this address every time you recompile/deploy
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

function getActiveGroups(address user) public returns (uint[] memory) {
        uint[] storage validGroups= ; // groups that the user is a part of
        for(uint i = 0; i < groups.length; i++) {
            address[] memory members=groups[i].members;
            for(uint j = 0; j < members.length; j++) {
                if(members[j]==user){
                    validGroups.push();
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