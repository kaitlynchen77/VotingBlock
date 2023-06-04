window.onload = initialize();

async function initialize() {
  // check connection to metamask
  if (typeof web3 !== 'undefined') { // metamask is installed
    web3Provider = window.web3.currentProvider;
    web3 = new Web3(window.web3.currentProvider);
    accounts = await web3.eth.getAccounts();
    if(accounts.length > 0) {
      window.location.href = "./results";
    }
  } else {
    alert("Please install metamask.");
  }
}

async function connect() { // code adapted from https://github.com/nikitamarcius
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
    window.location.href = './results';
  } catch (error) {
    if (error.code === 4001) {
      console.log('User canceled the request or denied permission');
    } 
  }
}
