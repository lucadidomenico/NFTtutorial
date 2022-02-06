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

    await myNFT.createNFT("https://wallpapercave.com/wp/wp7683898.jpg");
    
    const accounts = await ethers.getSigners();
    const owner = accounts[0].address;
    const addr1 = accounts[1].address;
    const addr2 = accounts[2].address;

    console.log();
    console.log("Owner: " + owner);
    console.log("Addr 1: " + addr1);
    console.log("Addr 2: " + addr2);
    console.log();

    const approvedAddr = addr1;
    const tokenId = 1;
    
    await myNFT.balanceOf(owner).then((balance) => console.log("Balance for " + owner + " is " + balance));
    await myNFT.balanceOf(addr2).then((balance) => console.log("Balance for " + addr2 + " is " + balance));
    await myNFT.ownerOf(tokenId).then((addr) => console.log("The owner of " + tokenId + " is " + addr));    
    
    console.log();
    
    await myNFT.approve(approvedAddr, tokenId);
    console.log("Approved address for token " + tokenId + " is " + await myNFT.getApproved(tokenId));

    console.log();

    console.log(await myNFT.getApproved(tokenId) + " is sending token " + tokenId + " to " + addr2);
    await myNFT.connect(accounts[1])["safeTransferFrom(address,address,uint256)"](owner, addr2, tokenId);

    console.log();

    await myNFT.balanceOf(owner).then((balance) => console.log("Balance for " + owner + " is now " + balance));
    await myNFT.balanceOf(addr2).then((balance) => console.log("Balance for " + addr2 + " is now " + balance));
    await myNFT.ownerOf(tokenId).then((addr) => console.log("The owner of " + tokenId + " is now " + addr));
  }
  
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });