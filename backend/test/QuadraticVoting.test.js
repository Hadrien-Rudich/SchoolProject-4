const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

async function deployHomeOwnerToken() {
  const [owner, addr4] = await ethers.getSigners();
  const contract = await ethers.getContractFactory("HomeOwnerToken");
  const homeOwnerToken = await contract.deploy(owner.address);
  return {
    homeOwnerToken,
    owner,
    addr4,
  };
}

async function deployVoteAdministration() {
  const [owner, addr2, addr3] = await ethers.getSigners();
  const { homeOwnerToken } = await loadFixture(deployHomeOwnerToken);
  const contract = await ethers.getContractFactory("VoteAdministration");
  const voteAdministration = await contract.deploy(
    homeOwnerToken.target,
    addr3.address
  );

  return {
    voteAdministration,
    homeOwnerToken,
    owner,
    addr2,
    addr3,
  };
}

async function deployQuadraticVoting() {
  const [owner, addr2, addr4] = await ethers.getSigners();

  const DEFAULT_ADMIN_ROLE =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  const VOTER_ROLE =
    "0x3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a848";

  const { homeOwnerToken } = await loadFixture(deployHomeOwnerToken);
  const { voteAdministration, addr3 } = await loadFixture(
    deployVoteAdministration
  );

  const contract = await ethers.getContractFactory("QuadraticVoting");
  const quadraticVoting = await contract.deploy(
    homeOwnerToken.target,
    voteAdministration.target,
    owner.address
  );

  return {
    quadraticVoting,
    voteAdministration,
    owner,
    addr2,
    addr3,
    addr4,
    DEFAULT_ADMIN_ROLE,
    VOTER_ROLE,
  };
}

async function deployQuadraticVotingWithBURNER_ROLE() {
  const [owner, addr2] = await ethers.getSigners();

  const DEFAULT_ADMIN_ROLE =
    "0x0000000000000000000000000000000000000000000000000000000000000000";

  const { homeOwnerToken, addr4 } = await loadFixture(deployHomeOwnerToken);
  const { voteAdministration, addr3 } = await loadFixture(
    deployVoteAdministration
  );
  const contract = await ethers.getContractFactory("QuadraticVoting");
  const quadraticVoting = await contract.deploy(
    homeOwnerToken.target,
    voteAdministration.target,
    addr2.address
  );

  await homeOwnerToken
    .connect(owner)
    .addMinterBurner(voteAdministration.target);

  await homeOwnerToken.connect(owner).addBurner(quadraticVoting.target);

  return {
    quadraticVoting,
    voteAdministration,
    owner,
    addr2,
    addr3,
    addr4,
    DEFAULT_ADMIN_ROLE,
  };
}

describe("QuadraticVoting Contract Tests", function () {
  describe("Deployment", function () {
    it("Should return a valid deployment contract address", async function () {
      const { quadraticVoting } = await loadFixture(deployQuadraticVoting);
      expect(quadraticVoting.target).to.not.equal(undefined);
    });
    it("Should grant the DEFAULT_ADMIN_ROLE to the owner", async function () {
      const { quadraticVoting, owner, addr2, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployQuadraticVoting);

      const ownerHasDEFAULT_ADMIN_ROLE = await quadraticVoting.hasRole(
        DEFAULT_ADMIN_ROLE,
        owner.address
      );
      expect(ownerHasDEFAULT_ADMIN_ROLE).to.equal(true);

      const addr2HasDEFAULT_ADMIN_ROLE = await quadraticVoting.hasRole(
        DEFAULT_ADMIN_ROLE,
        addr2.address
      );
      expect(addr2HasDEFAULT_ADMIN_ROLE).to.equal(false);
    });
  });
  describe("castVote", function () {
    it("Should NOT be available to roles other than VOTER_ROLE", async function () {
      const { quadraticVoting, addr2 } = await loadFixture(
        deployQuadraticVoting
      );

      await expect(
        quadraticVoting.connect(addr2).castVote(0, true, 11)
      ).to.be.revertedWithCustomError(quadraticVoting, "UserLacksVoterRole");
    });

    it("Should NOT allow a vote to a proposalId that does not exist", async function () {
      const { quadraticVoting, voteAdministration, addr2, addr3 } =
        await loadFixture(deployQuadraticVotingWithBURNER_ROLE);

      await voteAdministration.connect(addr3).setUpVotingSession();

      await voteAdministration
        .connect(addr3)
        .addProposal("Test Title 1", "Test Description 1");

      await voteAdministration.connect(addr3).addVoter(addr2.address, 100);

      await expect(
        quadraticVoting.connect(addr2).castVote(4, true, 11)
      ).to.be.revertedWithCustomError(quadraticVoting, "ProposalDoesNotExist");
    });

    it("Should NOT allow a voter to vote more than once for the same proposalId", async function () {
      const { quadraticVoting, voteAdministration, addr2, addr3 } =
        await loadFixture(deployQuadraticVotingWithBURNER_ROLE);

      await voteAdministration.connect(addr3).setUpVotingSession();

      await voteAdministration
        .connect(addr3)
        .addProposal("Test Title 1", "Test Description 1");

      await voteAdministration.connect(addr3).addVoter(addr2.address, 100);

      await quadraticVoting.connect(addr2).castVote(1, true, 9);

      await expect(
        quadraticVoting.connect(addr2).castVote(1, true, 9)
      ).to.be.revertedWithCustomError(quadraticVoting, "VoterHasAlreadyVoted");
    });

    it("Should NOT allow a vote exceeding additionalVotingPower", async function () {
      const { quadraticVoting, voteAdministration, addr2, addr3 } =
        await loadFixture(deployQuadraticVotingWithBURNER_ROLE);

      await voteAdministration.connect(addr3).setUpVotingSession();

      await voteAdministration
        .connect(addr3)
        .addProposal("Test Title 1", "Test Description 1");

      await voteAdministration.connect(addr3).addVoter(addr2.address, 100);

      await expect(
        quadraticVoting.connect(addr2).castVote(1, false, 11)
      ).to.be.revertedWithCustomError(quadraticVoting, "VoterLacksCredits");
    });

    it("Should properly tally a totalVotingPower (baseVotingPower + additionalVotingPower)", async function () {
      const { voteAdministration, addr2, addr3 } = await loadFixture(
        deployQuadraticVotingWithBURNER_ROLE
      );

      const baseVotingPower = 350;
      const additionalVotingPower = 100;
      await voteAdministration
        .connect(addr3)
        .setTokensPerNewVoter(additionalVotingPower);

      await voteAdministration.connect(addr3).setUpVotingSession();

      await voteAdministration
        .connect(addr3)
        .addVoter(addr2.address, baseVotingPower);

      const voter = await voteAdministration.getVoter(addr2.address);
      const voterAdditionalVotingPower =
        await voteAdministration.getVoterTokenBalance(addr2.address);

      const totalVotingPower =
        Number(voter.baseVotingPower) + Number(voterAdditionalVotingPower);
      expect(totalVotingPower).to.equal(
        baseVotingPower + additionalVotingPower
      );
    });

    it("Should properly register votesFor and votesAgainst", async function () {
      const { voteAdministration, addr2, addr3 } = await loadFixture(
        deployQuadraticVotingWithBURNER_ROLE
      );

      const baseVotingPower = 350;

      await voteAdministration.connect(addr3).setUpVotingSession();

      await voteAdministration
        .connect(addr3)
        .addVoter(addr2.address, baseVotingPower);

      const voter = await voteAdministration
        .connect(addr3)
        .getVoter(addr2.address);

      expect(voter.baseVotingPower).to.equal(baseVotingPower);
    });

    it("Should burn the requested amount of HomeOwnerTokens", async function () {
      const { quadraticVoting, voteAdministration, addr2, addr3 } =
        await loadFixture(deployQuadraticVotingWithBURNER_ROLE);

      await voteAdministration.connect(addr3).setUpVotingSession();

      await voteAdministration
        .connect(addr3)
        .addProposal("Test Title 1", "Test Description 1");

      await voteAdministration.connect(addr3).addVoter(addr2.address, 100);

      const initialAddr2TokenBalance = await voteAdministration
        .connect(addr3)
        .getVoterTokenBalance(addr2.address);

      expect(initialAddr2TokenBalance).to.be.eq(100);

      await quadraticVoting.connect(addr2).castVote(1, true, 9);
      const addr2TokenBalanceAfterVote = await voteAdministration
        .connect(addr3)
        .getVoterTokenBalance(addr2.address);

      expect(addr2TokenBalanceAfterVote).to.be.eq(19);
    });
    it("Should emit a broadcast at vote cast", async function () {
      const { quadraticVoting, voteAdministration, addr2, addr3 } =
        await loadFixture(deployQuadraticVotingWithBURNER_ROLE);

      await voteAdministration.connect(addr3).setUpVotingSession();

      await voteAdministration
        .connect(addr3)
        .addProposal("Test Title 7", "Test Description 7");

      await voteAdministration.connect(addr3).addVoter(addr2.address, 100);

      await expect(quadraticVoting.connect(addr2).castVote(1, true, 9))
        .to.emit(quadraticVoting, "VoteCast")
        .withArgs(addr2.address, 1, true, 9);
    });
  });
  describe("grantAdminRole", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const { quadraticVoting, addr2, DEFAULT_ADMIN_ROLE } = await loadFixture(
        deployQuadraticVoting
      );

      await expect(quadraticVoting.connect(addr2).grantAdminRole(addr2.address))
        .to.be.revertedWithCustomError(
          quadraticVoting,
          "AccessControlUnauthorizedAccount"
        )
        .withArgs(addr2.address, DEFAULT_ADMIN_ROLE);
    });
    it("Should NOT add the DEFAULT_ADMIN_ROLE to an address that has it already", async function () {
      const { quadraticVoting, owner, DEFAULT_ADMIN_ROLE } = await loadFixture(
        deployQuadraticVoting
      );

      const ownerHasDEFAULT_ADMIN_ROLE = await quadraticVoting.hasRole(
        DEFAULT_ADMIN_ROLE,
        owner.address
      );
      expect(ownerHasDEFAULT_ADMIN_ROLE).to.equal(true);

      await expect(
        quadraticVoting.connect(owner).grantAdminRole(owner.address)
      ).to.be.revertedWithCustomError(quadraticVoting, "AddressAlreadyAdmin");
    });
    it("Should grant the ADMIN_ROLE to the address", async function () {
      const { quadraticVoting, owner, addr3, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployQuadraticVoting);

      await quadraticVoting.connect(owner).grantAdminRole(addr3.address);

      const addr3HasDEFAULT_ADMIN_ROLE = await quadraticVoting.hasRole(
        DEFAULT_ADMIN_ROLE,
        addr3.address
      );
      expect(addr3HasDEFAULT_ADMIN_ROLE).to.equal(true);
    });
  });
  describe("getAdmins", function () {
    it("Should return the adminsArray", async function () {
      const { quadraticVoting, owner, addr2, addr4 } = await loadFixture(
        deployQuadraticVoting
      );

      await quadraticVoting.connect(owner).grantAdminRole(addr2.address);
      await quadraticVoting.connect(owner).grantAdminRole(addr4.address);

      const adminsArray = await quadraticVoting.getAdmins();
      expect(adminsArray).to.eql([owner.address, addr2.address, addr4.address]);
    });
  });
  describe("getVoteSummary", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const {
        quadraticVoting,
        voteAdministration,
        addr2,
        addr3,
        DEFAULT_ADMIN_ROLE,
      } = await loadFixture(deployQuadraticVotingWithBURNER_ROLE);

      await voteAdministration.connect(addr3).setUpVotingSession();

      await voteAdministration
        .connect(addr3)
        .addProposal("Test Title 1", "Test Description 1");

      await voteAdministration.connect(addr3).addVoter(addr2.address, 100);

      await quadraticVoting.connect(addr2).castVote(1, true, 9);

      await expect(quadraticVoting.connect(addr3).getVoteSummary(1))
        .to.be.revertedWithCustomError(
          quadraticVoting,
          "AccessControlUnauthorizedAccount"
        )
        .withArgs(addr3.address, DEFAULT_ADMIN_ROLE);
    });
    it("Should NOT accept a proposalId that does not exist", async function () {
      const { quadraticVoting, voteAdministration, addr2, addr3 } =
        await loadFixture(deployQuadraticVotingWithBURNER_ROLE);

      await voteAdministration.connect(addr3).setUpVotingSession();

      await voteAdministration
        .connect(addr3)
        .addProposal("Test Title 1", "Test Description 1");

      await voteAdministration.connect(addr3).addVoter(addr2.address, 100);

      await quadraticVoting.connect(addr2).castVote(1, true, 9);

      await expect(
        quadraticVoting.connect(addr2).getVoteSummary(4)
      ).to.be.revertedWithCustomError(quadraticVoting, "ProposalDoesNotExist");
    });
    it("Should correctly tally votes for a proposal", async function () {
      const { quadraticVoting, voteAdministration, addr2, addr3 } =
        await loadFixture(deployQuadraticVotingWithBURNER_ROLE);

      await voteAdministration
        .connect(addr3)
        .grantAdminRole(quadraticVoting.target);

      await voteAdministration.connect(addr3).setUpVotingSession();
      await voteAdministration
        .connect(addr3)
        .addProposal("Test Title 1", "Test Description 1");
      await voteAdministration.connect(addr3).addVoter(addr2.address, 100);
      await voteAdministration.connect(addr3).addVoter(addr3.address, 100);

      await quadraticVoting.connect(addr2).castVote(1, true, 10);
      await quadraticVoting.connect(addr3).castVote(1, false, 5);

      const summary = await quadraticVoting.connect(addr2).getVoteSummary(1);

      const expectedVotesFor = 100 + 10 ** 2;
      const expectedVotesAgainst = 100 + 5 ** 2;

      expect(summary.totalVotesFor).to.equal(expectedVotesFor);
      expect(summary.totalVotesAgainst).to.equal(expectedVotesAgainst);
    });
  });
});
