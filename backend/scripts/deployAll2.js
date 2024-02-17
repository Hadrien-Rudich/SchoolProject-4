// const hre = require("hardhat");

// async function main() {
//   const signers = await hre.ethers.getSigners();

//   // Deploy HomeOwnerToken
//   const HomeOwnerTokenFactory = await hre.ethers.getContractFactory(
//     "HomeOwnerToken"
//   );
//   const HomeOwnerToken = await HomeOwnerTokenFactory.deploy(signers[0].address);
//   await HomeOwnerToken.waitForDeployment();

//   // Deploy VoteAdministration
//   const VoteAdministrationFactory = await hre.ethers.getContractFactory(
//     "VoteAdministration"
//   );
//   const VoteAdministration = await VoteAdministrationFactory.deploy(
//     HomeOwnerToken.target,
//     signers[0].address
//   );
//   await VoteAdministration.waitForDeployment();

//   // Add MinterBurner role to VoteAdministration
//   await HomeOwnerToken.addMinterBurner(VoteAdministration.target);

//   // Deploy QuadraticVoting
//   const QuadraticVotingFactory = await hre.ethers.getContractFactory(
//     "QuadraticVoting"
//   );
//   const QuadraticVoting = await QuadraticVotingFactory.deploy(
//     HomeOwnerToken.target,
//     VoteAdministration.target,
//     signers[0].address
//   );
//   await QuadraticVoting.waitForDeployment();

//   console.log(`HomeOwnerToken deployed to: ${HomeOwnerToken.target}`);
//   console.log(`VoteAdministration deployed to: ${VoteAdministration.target}`);
//   console.log(`QuadraticVoting deployed to: ${QuadraticVoting.target}`);

//   // Additional: Log the network being used
//   const network = await hre.ethers.provider.getNetwork();
//   console.log(
//     `Contracts deployed on network: ${network.name}, (${network.chainId})`
//   );
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
