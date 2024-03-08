import { ethers } from "./ethers-5.6.esm.min.js";
import { contractAddress, ABI } from "./constants.js";


const connectButton = document.getElementById("connectButton");
const retrieveButton = document.getElementById("retrieveButton");
const storeButton = document.getElementById("storeButton");
connectButton.onclick = connect;
retrieveButton.onclick = retrieve;
storeButton.onclick = store;


async function connect() {

  // onnectoutton.onclick  
  if (typeof window.ethereum !== "undefined") {
    try {
        
      
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // console.log("metamask is installed")
    } catch (error) {
      console.log (error);
    }
    connectButton.innerHTML = "CONNECTED";
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    //read about the eth_account and eth_requestAccounts from metamask docs
    console.log(accounts);
  }
  
}

async function retrieve() {
  if (typeof window.ethereum !== "undefined") { 
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const retriever = await provider.getBalance(contractAddress);
    console.log(retriever.toString());
  }

}
async function store() {
  const ethAmount = document.getElementById('ethAmount').value;
  console.log(`funding with ${ethAmount}.....`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    try {
      const valueInWei = ethers.utils.parseEther(ethAmount.toString());
      // const valueToString = valueInWei.toString();
      console.log(`Value in Wei: ${valueInWei}`);

      const transactionResponse = await contract.store({
        value: valueInWei});
      await transactionResponse.wait(1);
    } catch (error) {
      console.log(error);
    }
  }
}