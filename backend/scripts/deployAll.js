const hre = require("hardhat");

async function main() {
  const signers = await hre.ethers.getSigners();

  const HomeOwnerToken = await hre.ethers.deployContract("HomeOwnerToken", [
    signers[0].address,
  ]);

  await HomeOwnerToken.waitForDeployment();

  const VoteAdministration = await hre.ethers.deployContract(
    "VoteAdministration",
    [HomeOwnerToken.target, signers[0].address]
  );

  await VoteAdministration.waitForDeployment();
  await HomeOwnerToken.addMinterBurner(VoteAdministration.target);

  console.log(
    `HomeOwnerToken deployed to: ${HomeOwnerToken.target}, VoteAdministration contract deployed to: ${VoteAdministration.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});