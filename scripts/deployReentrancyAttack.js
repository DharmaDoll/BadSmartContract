// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Mal = await hre.ethers.getContractFactory("Attacker_03");
  const Dao = await hre.ethers.getContractFactory("EtherStore_03");
  // const Dao = await hre.ethers.getContractFactory("SimpleDAO");

  // # 署名するのは一つ目に取得できるアカウントらしい。
  // # Contracts are deployed using the first signer/account by default
  const dao = await Dao.deploy();
  const mal = await Mal.deploy(dao.address);
  // const lock = await contractxx.deploy(unlockTime, { value: lockedAmount });

  await dao.deployed();
  await mal.deployed();

  console.log(
    `EtherStore_03 deployed to ${dao.address}`
  );
  console.log(
    `Attacker_03 deployed to ${mal.address}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
