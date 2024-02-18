const hre = require("hardhat");

async function main() {
  // Contract addresses (replace these placeholders with your actual contract addresses)
  const homeOwnerTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const voteAdministrationAddress =
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const quadraticVotingAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

  // Getting the signers
  const [deployer] = await hre.ethers.getSigners();

  // Initialize contract instances
  const HomeOwnerToken = await hre.ethers.getContractAt(
    "HomeOwnerToken",
    homeOwnerTokenAddress,
    deployer
  );
  const VoteAdministration = await hre.ethers.getContractAt(
    "VoteAdministration",
    voteAdministrationAddress,
    deployer
  );
  const QuadraticVoting = await hre.ethers.getContractAt(
    "QuadraticVoting",
    quadraticVotingAddress,
    deployer
  );

  await VoteAdministration.setTokensPerNewVoter(100);

  await VoteAdministration.setUpVotingSession();

  await VoteAdministration.addVoter(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    200
  );

  await VoteAdministration.addProposal(
    "Renovation de la facade exterieure 1",
    "Description 1"
  );
  await VoteAdministration.addProposal("Refection des caves", "Description 2");
  await VoteAdministration.addProposal(
    "Modification de la colonne d'eau des parties communes",
    "Description 3"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
