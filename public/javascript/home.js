
var contract;
var abi;
window.onload=displayElections();
async function displayElections() {
  
 // voting = await this.importContract();
 web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
 await fetch('./Voting.json')
    .then(response => response.json()) // parse the response as JSON
    .then(data => {
        abi = data.abi; 
    })
    .catch(err => console.error(err));
  contract=await new web3.eth.Contract(abi, "0x01699D475c718eD4C7077C98516f266A864743A5");
  var elections=await contract.methods.getElections().call();
  let candidatesArray=elections[0][1];
  console.log(candidatesArray);
  let yourElections=document.getElementById('yourElections');
  for (let i = 0; i < candidatesArray.length; i++) {
    yourElections.innerHTML+="<br> name:" + candidatesArray[i][0];
    yourElections.innerHTML+="<br> vote count:" + candidatesArray[i][1];
  }
}


