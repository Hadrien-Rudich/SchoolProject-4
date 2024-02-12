const hre = require("hardhat");

async function main() {
  const signers = await hre.ethers.getSigners();

  const HomeOwnerToken = await hre.ethers.deployContract("HomeOwnerToken", [
    signers[0].address,
  ]);

  console.log(signers[0].address);
  await HomeOwnerToken.waitForDeployment();

  console.log(
    `HomeOwnerToken contract was deployed to: ${HomeOwnerToken.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
