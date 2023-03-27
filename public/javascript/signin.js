function signin() {
    if (typeof window.ethereum !== 'undefined') {
      checkAccounts();
    } else {
      //send error message
    }
}
async function checkAccounts() {
  const accounts= await ethereum.request({ method: 'eth_accounts' }).then(stuff).catch((err) => {
    console.error(err);
  });
}
function stuff(accounts) {
  if(accounts.length===0) {
    console.log("hello")
    getAccount();
  }
}
async function getAccount() {
  const accounts2 = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
}
