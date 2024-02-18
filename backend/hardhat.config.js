require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ALCHEMY_SEPOLIA_RPC_URL = process.env.ALCHEMY_SEPOLIA_RPC_URL || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
      },
    ],
  },
  networks: {
    sepolia: {
      url: ALCHEMY_SEPOLIA_RPC_URL,

      accounts: [`0x${PRIVATE_KEY}`],

      chainId: 11155111,
    },
  },
};
