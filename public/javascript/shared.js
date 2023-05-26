var contract;
let web3Provider;
let abi;
var groups;
var accounts;
var activeGroups=[];

async function sharedInitialize() {
    // check connection to metamask
    if (typeof web3 !== 'undefined') { // metamask is installed
      web3Provider = window.web3.currentProvider;
      web3 = new Web3(window.web3.currentProvider);
      accounts = await web3.eth.getAccounts();
      if(accounts.length ==0) { // user is not logged in
        window.location.href = "./"; // there is some lag here, find a way to move this to app.js
      }
    } else {
      window.location.href = "./";
    } 
    await connectContract();
    groups=await contract.methods.getGroups().call();
    await getActiveGroups();
}
async function connectContract() {
    await fetch('./Voting.json')
      .then(response => response.json()) // parse the response as JSON
      .then(data => {
        abi = data.abi;
      })
      .catch(err => console.error(err));
    contract = await new web3.eth.Contract(abi, "0x372703402e902Ad99690CBC6Fe40F74248D5510b"); // change this address every time you recompile/deploy
  }

function getActiveGroups() {
    for (let i = 0; i < groups.length; i++) { // groups[i] iterates through each group in groups
      let group = groups[i];
      let members = group.members;
      for (let j = 0; j < members.length; j++) {
        if (members[j] == accounts[0]) {
          activeGroups.push(i);
          break;
        }
      }
    }
  }