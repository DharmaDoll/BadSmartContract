require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: { allowUnlimitedContractSize: true },
    hardhat: { allowUnlimitedContractSize: true },
  },
};

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async () => {});