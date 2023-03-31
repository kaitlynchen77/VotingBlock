let web3 = require('../../app.js').web3;

console.log(web3)


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
        ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        window.location.href = "./voting";
    }
}

init_web3()