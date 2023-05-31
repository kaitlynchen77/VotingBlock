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
      if(accounts.length==0) { // user is not logged in
        window.location.href = "./";
      }
    } else {
      window.location.href = "./";
    } 
    await connectContract();
    groups=await contract.methods.getGroups().call();
    await getActiveGroups();
}
async function connectContract() {
    const response = await fetch('./Voting.json');
    const responseJSON = await response.json();
    contract = await new web3.eth.Contract(responseJSON.abi, "0x05cC7c8bfA02dDa3e80213F64C36994495bb17aD"); // change this address every time you recompile/deploy
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