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
  console.log("URL: https://rinkeby.rarible.com/token/" + myNFT.address + ":" + tokenId);

}
  
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });