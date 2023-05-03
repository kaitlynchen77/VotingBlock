// Source code to interact with smart contract
var fs = require('fs');
var jsonFile = "/build/Voting.json"; 
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
var contract= new web3.eth.Contract(abi, 0x12345678912345678912345678912345678912); //replace with my own address
  
  // Accounts
  var account;
  
  web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
  });
  
  //Smart contract functions
  function registerSetInfo() {
    info = $("#newInfo").val();
    contract.methods.setInfo (info).send( {from: account}).then( function(tx) {
      console.log("Transaction: ", tx);
    });
    $("#newInfo").val('');
  }
  
  function registerGetInfo() {
    contract.methods.getInfo().call().then( function( info ) {
      console.log("info: ", info);
      document.getElementById('lastInfo').innerHTML = info;
    });
  }