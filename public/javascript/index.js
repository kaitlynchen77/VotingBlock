window.onload = initialize();

async function initialize() {
  await sharedInitialize();
  console.log(accounts);
  if(accounts.length > 0) {
    window.location.href = "./home";
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
    window.location.href = './home';
  } catch (error) {
    if (error.code === 4001) {
      console.log('User canceled the request or denied permission');
    } 
  }
}
