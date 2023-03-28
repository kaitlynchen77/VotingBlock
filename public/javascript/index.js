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
        window.location.href = "./signin";
    } else {
        window.location.href = "./voting";
    }
}