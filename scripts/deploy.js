const { ethers, run, network } = require("hardhat");
const { expect } = require('chai');
const path = require('path');

const pathLeonToken = '../artifacts/contracts/zkEvmToken.sol/ZkEvmToken.json';
const LeonToken = require(pathLeonToken);

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

   /*-------------------- CONTRACT IS ALREADY DEPLOYED ONLY VERIFY --------------------------*/ 

  // const address = '0x29D77C62f68a680A3C575dEe23db97A8770E5800';
  // const ERC20 = await ethers.getContractFactory('ZkEvmToken');
  // const ERC20Contract =  ERC20.attach(address);
  // console.log(`Deployed to : ${ERC20Contract.address}`)

  /*----------------------------- CONTRACT DEPLOYING --------------------------------*/

  const ERC20 = await ethers.getContractFactory("ZkEvmToken");
  const ERC20Contract = await ERC20.deploy();
  await ERC20Contract.deployed();
  console.log(`Deployed to : ${ERC20Contract.address}`)

  /*-------------------------- CONTRACT VERIFICATION -------------------------------*/
  
  if (network.config.chainId === 1442 && typeof process.env.ETHERSCAN_ZKEVM_API_KEY !== 'undefined'  || 
  network.config.chainId === 1101 && typeof process.env.ETHERSCAN_ZKEVM_API_KEY !== 'undefined' ) {
    
    const RPC_URL = (network.config.chainId === 1101 ) ? process.env.ZKEVM_MAINNET_RPC_URL : process.env.ZKEVM_TESTNET_RPC_URL;
    const etherscanURL = (network.config.chainId === 1101 ) ? 'https://zkevm.polygonscan.com/address/': 'https://testnet-zkevm.polygonscan.com/address/' ;
    const etherscanVerifyURL = (network.config.chainId === 1101 ) ? 'https://explorer.mainnet.zkevm-test.net/' : 'https://explorer.public.zkevm-test.net/address/';
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    
    const deployedBytecodePolygonZkEVM = await ethers.provider.getCode(ERC20Contract.address);
    expect(await provider.getCode(ERC20Contract.address))
      .to.be.equal(LeonToken.deployedBytecode);
    console.log("PolygonZkEVMDeployer was correctly verified")
    console.log("Etherscan Explorer URL: ", etherscanURL + ERC20Contract.address)
    console.log("Etherscan Verifier Explorer URL: ", etherscanVerifyURL + ERC20Contract.address)
    console.log("Path file: ", path.join(__dirname, pathLeonToken));
    console.log();

    console.log("Contract Verification on deployed network ");
    await ERC20Contract.deployTransaction.wait(6);
    await verify(ERC20Contract.address, [])

  }


}

async function verify(contractAddress, args) {
  console.log("verifying contract....")
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e)
    }
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});