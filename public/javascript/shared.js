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
      if(window.location.pathname !== '/' && accounts.length ==0) { // user is not logged in
        window.location.href = "./";
        await connectContract();
        groups=await contract.methods.getGroups().call();
        await getActiveGroups();
      }
    } else {
      window.location.href = "./";
    } 
}
async function connectContract() {
    await fetch('./Voting.json')
      .then(response => response.json()) // parse the response as JSON
      .then(data => {
        abi = data.abi;
      })
      .catch(err => console.error(err));
  contract = await new web3.eth.Contract(abi, "0x05cC7c8bfA02dDa3e80213F64C36994495bb17aD"); // change this address every time you recompile/deploy
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