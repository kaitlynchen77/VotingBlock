formDiv = document.getElementById("formDiv");
var contract;
var abi;
let groups;
let accounts;
window.onload=initialize();

async function initialize() {
    await connectContract();
    accounts = await web3.eth.getAccounts();
    groups=await contract.methods.getGroups().call();
    await getActiveGroups();
    console.log(groups);
  }
  
  async function connectContract() {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    await fetch('./Voting.json')
      .then(response => response.json()) // parse the response as JSON
      .then(data => {
          abi = data.abi; 
      })
      .catch(err => console.error(err));
    contract = await new web3.eth.Contract(abi, "0xE437fe303f4EbAA005cbDe94e1E06D01a6678673"); // change this address every time you recompile/deploy
  }


  function getActiveGroups() {
    for (let i = 0; i < groups.length; i++) { // groups[i] iterates through each group in groups
      let group = groups[i];
      let members = group.members;
      for(let j = 0; j < members.length; j++) {
        if(members[j]==accounts[0]) {
          activeGroups.push(i);
          break;
        }
      } 
    }
  }

function addCandidate() {
    formDiv.innerHTML += 
        "<input type='text' class='form-control w-25' placeholder='First Name'>" + 
        "<input type='text' class='form-control w-25' placeholder='Last Name'>" + 
        "<input type='text' class='form-control w-50' placeholder='Candidate Description'>";
}

async function endElection() {
    await contracts.methods.endElection(0,0).send({ from: accounts[0] }); //keep 0,0 for now. change when there are multiple elections and groups
}