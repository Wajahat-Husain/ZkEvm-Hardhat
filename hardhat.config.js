require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

const ZKEVM_MAINNET_RPC_URL = process.env.ZKEVM_MAINNET_RPC_URL;
const ZKEVM_TESTNET_RPC_URL = process.env.ZKEVM_TESTNET_RPC_URL;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const ETHERSCAN_ZKEVM_API_KEY = process.env.ETHERSCAN_ZKEVM_API_KEY;

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }

});

module.exports = {
  mocha: {
    timeout: 10000000000,
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: {
      polygonZKEVMMainnet: ETHERSCAN_ZKEVM_API_KEY,
      polygonZKEVMTestnet: ETHERSCAN_ZKEVM_API_KEY
    },
    customChains: [
      {
        network: "polygonZKEVMMainnet",
        chainId: 1101,
        urls: {
          apiURL: "https://explorer.mainnet.zkevm-test.net/api",
          browserURL: "https://explorer.mainnet.zkevm-test.net/"
        }
      },
      {
        network: "polygonZKEVMTestnet",
        chainId: 1442,
        urls: {
          apiURL: "https://explorer.public.zkevm-test.net/api",
          browserURL: "https://explorer.public.zkevm-test.net/"
        }
      }
    ],
    timeout: 60000  // increase timeout to 1 minute (default is 20000ms)
  },
  networks: {
    polygonZKEVMMainnet: {
      url: ZKEVM_MAINNET_RPC_URL, 
      accounts: [PRIVATE_KEY],
      chainId: 1101,
    },
    polygonZKEVMTestnet: {
      url: ZKEVM_TESTNET_RPC_URL, 
      accounts: [PRIVATE_KEY],
      chainId: 1442,
    }
  },

};
