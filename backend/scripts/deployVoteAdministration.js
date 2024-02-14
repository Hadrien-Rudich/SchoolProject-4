const hre = require("hardhat");

async function main() {
  const signers = await hre.ethers.getSigners();
  const tokenContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  const VoteAdministration = await hre.ethers.deployContract(
    "VoteAdministration",
    [tokenContractAddress, signers[0].address]
  );

  await VoteAdministration.waitForDeployment();

  console.log(
    `VoteAdministration contract with Minter/Burner role was deployed to: ${VoteAdministration.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
