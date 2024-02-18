const hre = require("hardhat");

async function main() {
  const signers = await hre.ethers.getSigners();
  const tokenContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const voteAdminContractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

  const QuadraticVoting = await hre.ethers.deployContract("QuadraticVoting", [
    tokenContractAddress,
    voteAdminContractAddress,
    signers[0].address,
  ]);

  await QuadraticVoting.waitForDeployment();

  console.log(
    `QuadraticVoting contract was deployed to: ${QuadraticVoting.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
