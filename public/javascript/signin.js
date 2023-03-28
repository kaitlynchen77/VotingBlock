const signinButton = document.querySelector('.signinButton');

signinButton.addEventListener('click', () => {
  console.log("hi");
  ethereum.request({ method: 'eth_requestAccounts' });
});
