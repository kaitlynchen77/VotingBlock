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
  contract = await new web3.eth.Contract(abi, "0x3b20E93EF1762Bc3AB8CAAa437Dc42f8c6963b43"); // change this address every time you recompile/deploy
}

async function createElection() {
  await connectContract();
  const groupID = document.getElementById('group-ID').value
  const title = document.getElementById('election-title').value
  const accounts = await web3.eth.getAccounts();
  await contract.methods.createElection(parseInt(groupID), title).send({ from: accounts[0] });
  window.location.reload();
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