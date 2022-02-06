const hre = require("hardhat");

async function deploy() {
  const myNFTFactory = await hre.ethers.getContractFactory("myNFT");
  const myNFT = await myNFTFactory.deploy();

  let contract = await myNFT.deployed();
  return contract;
}

async function main() {

    const myNFT = await deploy();

    console.log("myNFT deployed to:", myNFT.address);

    const accounts = await hre.ethers.getSigners();
    const owner = accounts[0].address;
    const newOwner = accounts[1].address;
    const tokenId = 1;

    await myNFT.createNFT("https://wallpapercave.com/wp/wp7683898.jpg");
    console.log("URL: https://rinkeby.rarible.com/token/" + myNFT.address + ":" + tokenId);

    await new Promise(r => setTimeout(r, 60000));

    // console.log("*************************Prima dello scambio con safeTransferFrom***********************");
    
    await myNFT.balanceOf(owner).then((balance) => console.log("Balance for " + owner + " is " + balance));
    await myNFT.balanceOf(newOwner).then((balance) => console.log("Balance for " + newOwner + " is " + balance));
    await myNFT.ownerOf(tokenId).then((addr) => console.log("The owner of " + tokenId + " is " + addr));    

    await myNFT["safeTransferFrom(address,address,uint256)"](owner, newOwner, tokenId);
    await new Promise(r => setTimeout(r, 60000));
    
    console.log("*************************Dopo lo scambio con safeTransferFrom***********************");

    await myNFT.balanceOf(owner).then((balance) => console.log("Balance for " + owner + " is " + balance));
    await myNFT.balanceOf(newOwner).then((balance) => console.log("Balance for " + newOwner + " is " + balance));
    await myNFT.ownerOf(tokenId).then((addr) => console.log("The owner of " + tokenId + " is " + addr));
  }
  
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });