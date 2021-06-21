const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const POLYGON_DEPLOYER_KEY = process.env.POLYGON_DEPLOYER_KEY;
const POLYGON_TESTNET_DEPLOYER_KEY = process.env.POLYGON_TESTNET_DEPLOYER_KEY;

module.exports = {
  networks: {
    testnet: {
      provider: () => new HDWalletProvider(POLYGON_TESTNET_DEPLOYER_KEY, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    polygon: {
      provider: () => new HDWalletProvider(POLYGON_DEPLOYER_KEY, `https://rpc-mainnet.matic.network`),
      //provider: () => new HDWalletProvider(POLYGON_DEPLOYER_KEY, `https://matic-mainnet.chainstacklabs.com`),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gasPrice: 50000000000
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    // Add POLYGONSCAN_API_KEY in .env file to verify contracts deployed through truffle
    polygonscan: process.env.POLYGONSCAN_API_KEY
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      //https://forum.openzeppelin.com/t/how-to-deploy-uniswapv2-on-ganache/3885
      version: "0.6.12",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    },
  }
}