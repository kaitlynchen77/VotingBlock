function metaMaskSignin() {
    document.getElementById('signinButton').textContent="Signed in";
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      getAccount();
    }
}
async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    showAccount.innerHTML = account;
}