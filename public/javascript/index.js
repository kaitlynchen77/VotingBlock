let connected = false;
window.onload = initialize();

async function initialize() {
  // check connection to metamask
  if (typeof web3 !== 'undefined') { // metamask is installed
    web3Provider = window.web3.currentProvider;
    web3 = new Web3(window.web3.currentProvider);
    accounts = await web3.eth.getAccounts();
    if(accounts.length > 0) {
      connected = true;
    }
  } else {
    alert("Please install metamask.");
  }
}

async function connect() { // code adapted from https://github.com/nikitamarcius
  // If already connected, direct to results page
  if (connected) {
    window.location.href = "./results";
    return;
  }

  // if not already connected, prompt user to sign in with Metamask
  try {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{
        eth_accounts: {}
      }]
    });
    
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });
    window.location.href = './home';
  } catch (error) {
    if (error.code === 4001) {
      console.log('User canceled the request or denied permission');
    } 
  }
}
