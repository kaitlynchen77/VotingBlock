// let web3 = require('../../app.js').web3;

// console.log(web3)


function checkSignin() {
    if (typeof window.ethereum !== 'undefined') {
        checkAccounts();
      } else {
        //send error message
      }
}
async function checkAccounts() {
    const accounts= await ethereum.request({ method: 'eth_accounts' }).then(redirect).catch((err) => {
      console.error(err);
    });
}
function redirect(accounts) {
    if(accounts.length===0) {
        connect();
    } else {
        window.location.href = "./voting";
    }
}
async function connect() { // code from https://github.com/nikitamarcius
  const accounts = await window.ethereum.request({
    method: "wallet_requestPermissions",
    params: [{
        eth_accounts: {}
    }]
  }).then(() => ethereum.request({
    method: 'eth_requestAccounts'
  }))
}
