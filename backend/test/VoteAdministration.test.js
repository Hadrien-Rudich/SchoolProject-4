const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

async function deployHomeOwnerToken() {
  const [owner] = await ethers.getSigners();
  const contract = await ethers.getContractFactory("HomeOwnerToken");
  const homeOwnerToken = await contract.deploy(owner.address);
  return {
    homeOwnerToken,
    owner,
  };
}

async function deployVoteAdministration() {
  const [owner, addr2, addr3] = await ethers.getSigners();
  const DEFAULT_ADMIN_ROLE =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  const { homeOwnerToken } = await loadFixture(deployHomeOwnerToken);
  const contract = await ethers.getContractFactory("VoteAdministration");
  const voteAdministration = await contract.deploy(
    homeOwnerToken.target,
    owner.address
  );

  return {
    voteAdministration,
    homeOwnerToken,
    owner,
    addr2,
    addr3,
    DEFAULT_ADMIN_ROLE,
  };
}

async function deployVoteAdminWithMINTERBURNER_ROLE() {
  const [addr1, addr2, addr3] = await ethers.getSigners();
  const { homeOwnerToken, owner } = await loadFixture(deployHomeOwnerToken);

  const contract = await ethers.getContractFactory("VoteAdministration");
  const voteAdministration = await contract.deploy(
    homeOwnerToken.target,
    addr1.address
  );

  await homeOwnerToken
    .connect(owner)
    .addMinterBurner(voteAdministration.target);

  return {
    voteAdministration,
    homeOwnerToken,
    owner,
    addr1,
    addr2,
    addr3,
  };
}

async function deployVoteAdminInVotingSetUpWithMINTER_ROLE() {
  const [addr1, addr2, addr3] = await ethers.getSigners();
  const { homeOwnerToken, owner } = await loadFixture(deployHomeOwnerToken);

  const contract = await ethers.getContractFactory("VoteAdministration");
  const voteAdministration = await contract.deploy(
    homeOwnerToken.target,
    addr1.address
  );

  await homeOwnerToken
    .connect(owner)
    .addMinterBurner(voteAdministration.target);
  await voteAdministration.connect(addr1).setUpVotingSession();

  return {
    voteAdministration,
    homeOwnerToken,
    owner,
    addr1,
    addr2,
    addr3,
  };
}

describe("VoteAdministration Contract Tests", function () {
  describe("Deployment", function () {
    it("Should return a valid deployment contract address", async function () {
      const { voteAdministration } = await loadFixture(
        deployVoteAdministration
      );
      expect(voteAdministration.target).to.not.equal(undefined);
    });
    it("Should properly set up the tokenContract address", async function () {
      const { voteAdministration, homeOwnerToken } = await loadFixture(
        deployVoteAdministration
      );

      const tokenContractAddress = await voteAdministration.tokenContract();
      expect(tokenContractAddress).to.equal(homeOwnerToken.target);
    });
    it("Should give the owner the DEFAULT_ADMIN_ROLE", async function () {
      const { voteAdministration, owner, addr2, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployVoteAdministration);

      const ownerHasDEFAULT_ADMIN_ROLE = await voteAdministration.hasRole(
        DEFAULT_ADMIN_ROLE,
        owner.address
      );
      expect(ownerHasDEFAULT_ADMIN_ROLE).to.equal(true);

      const addr2HasDEFAULT_ADMIN_ROLE = await voteAdministration.hasRole(
        DEFAULT_ADMIN_ROLE,
        addr2.address
      );
      expect(addr2HasDEFAULT_ADMIN_ROLE).to.equal(false);
    });
    it("Should have VotingPowerAllocation as default currentWorkflowStatus", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdministration
      );

      expect(await voteAdministration.currentWorkflowStatus()).to.equal(0);
    });
  });
  describe("addVoter", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const { voteAdministration, addr2, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployVoteAdministration);

      await expect(
        voteAdministration.connect(addr2).addVoter(addr2.address, 100)
      )
        .to.be.revertedWithCustomError(
          voteAdministration,
          "AccessControlUnauthorizedAccount"
        )
        .withArgs(addr2.address, DEFAULT_ADMIN_ROLE);
    });
    it("Should NOT be available outside of VotingSetUp window", async function () {
      const { voteAdministration, owner, addr3 } = await loadFixture(
        deployVoteAdminWithMINTERBURNER_ROLE
      );

      await expect(
        voteAdministration.connect(owner).addVoter(addr3.address, 100)
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "CannotAddVotersOutsideOfVotingSetUp"
      );
    });
    it("Should NOT be available to roles other than MINTER_ROLE", async function () {
      const { voteAdministration, owner, addr2 } = await loadFixture(
        deployVoteAdministration
      );

      await voteAdministration.connect(owner).setUpVotingSession();

      await expect(
        voteAdministration.connect(owner).addVoter(addr2.address, 100)
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "ContractLacksMinterRole"
      );
    });
    it("Should not add an already existing voter", async function () {
      const { voteAdministration, addr1, addr2 } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration.connect(addr1).addVoter(addr2.address, 100);

      await expect(
        voteAdministration.connect(addr1).addVoter(addr2.address, 100)
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "AddressAlreadyVoter"
      );
    });

    it("Should increment voterCounter by 1", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration
        .connect(owner)
        .addVoter("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 100);
      await voteAdministration
        .connect(owner)
        .addVoter("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", 100);
      await voteAdministration
        .connect(owner)
        .addVoter("0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", 100);

      await expect(
        voteAdministration
          .connect(owner)
          .addVoter("0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", 100)
      )
        .to.emit(voteAdministration, "VoterRegistered")
        .withArgs("0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", 4);
    });
    it("Should create a Voter Struct with the expected content", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      const newVoterAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
      const newVoterBaseVotingPower = 200;

      await voteAdministration
        .connect(owner)
        .addVoter(newVoterAddress, newVoterBaseVotingPower);

      const voter = await voteAdministration.getVoter(newVoterAddress);

      const currentVoterCount = await voteAdministration.voterCounter();
      const voterIndex = parseInt(currentVoterCount);

      expect(voter.voterId).to.equal(voterIndex);
      expect(voter.baseVotingPower).to.equal(newVoterBaseVotingPower);
      expect(voter.voterAddress).to.equal(newVoterAddress);
    });
    it("Should grant the VOTER_ROLE to the address", async function () {
      const { voteAdministration, addr1, addr2 } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration.connect(addr1).addVoter(addr2.address, 200);

      const addr2IsVoter = await voteAdministration.isVoter(addr2.address);
      expect(addr2IsVoter).to.equal(true);
    });

    it("Should grant 100 HomeOwnerTokens to the voter by default", async function () {
      const { voteAdministration, addr1, addr2 } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration.connect(addr1).addVoter(addr2.address, 100);

      const voterTokenBalance = await voteAdministration
        .connect(addr1)
        .getVoterTokenBalance(addr2.address);
      expect(voterTokenBalance).to.be.eq(100);
    });

    it("Should emit a broadcast at voter addition", async function () {
      const { voteAdministration, addr1, addr2 } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await expect(
        voteAdministration.connect(addr1).addVoter(addr2.address, 200)
      )
        .to.emit(voteAdministration, "VoterRegistered")
        .withArgs(addr2.address, 1);
    });
  });

  describe("addProposal", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const { voteAdministration, owner, addr3, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployVoteAdministration);

      await voteAdministration.connect(owner).setUpVotingSession();

      await expect(
        voteAdministration
          .connect(addr3)
          .addProposal("Test Title", "Test Description")
      )
        .to.be.revertedWithCustomError(
          voteAdministration,
          "AccessControlUnauthorizedAccount"
        )
        .withArgs(addr3.address, DEFAULT_ADMIN_ROLE);
    });
    it("Should NOT be available outside of VotingSetUp window", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdministration
      );

      await expect(
        voteAdministration
          .connect(owner)
          .addProposal("Test Title", "Test Description")
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "CannotAddProposalsOutsideOfVotingSetUp"
      );
    });

    it("Should increment proposalCounter by 1", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration
        .connect(owner)
        .addProposal("Test Title 1", "Test Description 1");
      await voteAdministration
        .connect(owner)
        .addProposal("Test Title 2", "Test Description 2");
      await voteAdministration
        .connect(owner)
        .addProposal("Test Title 3", "Test Description 3");

      await expect(
        voteAdministration
          .connect(owner)
          .addProposal("Test Title 4", "Test Description 4")
      )
        .to.emit(voteAdministration, "ProposalRegistered")
        .withArgs("Test Title 4", 4);
    });

    it("Should create a Proposal Struct with the expected content", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      const title = "Proposal Title1";
      const description = "Proposal Description1";

      await voteAdministration.connect(owner).addProposal(title, description);

      const currentProposalCount = await voteAdministration.proposalCounter();
      const proposalIndex = parseInt(currentProposalCount);

      const proposal = await voteAdministration.getProposal(proposalIndex);

      expect(proposal.proposalId).to.equal(proposalIndex);
      expect(proposal.title).to.equal(title);
      expect(proposal.description).to.equal(description);
      expect(proposal.voteCount.toString()).to.equal("0");
      expect(proposal.votingIsClosed).to.equal(false);
      expect(proposal.isAccepted).to.equal(false);
    });

    it("Should emit a broadcast at proposal addition", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await expect(
        voteAdministration
          .connect(owner)
          .addProposal("Test Title", "Test Description")
      )
        .to.emit(voteAdministration, "ProposalRegistered")
        .withArgs("Test Title", 1);
    });
  });

  describe("setTokensPerNewVoter", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const { voteAdministration, addr3 } = await loadFixture(
        deployVoteAdministration
      );

      await expect(
        voteAdministration.connect(addr3).setTokensPerNewVoter(777)
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "AccessControlUnauthorizedAccount"
      );
    });
    it("Should NOT be available outside of VotingPowerAllocation window", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdministration
      );

      await voteAdministration.connect(owner).setUpVotingSession();

      await expect(
        voteAdministration.connect(owner).setTokensPerNewVoter(777)
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "CannotSetTokensOutsideOfVotingPowerAllocationWindow"
      );
    });

    it("Should set a new amount of tokens to be received by new voter", async function () {
      const { voteAdministration, addr1, addr2 } = await loadFixture(
        deployVoteAdminWithMINTERBURNER_ROLE
      );

      await voteAdministration.connect(addr1).setTokensPerNewVoter(999);

      await voteAdministration.connect(addr1).setUpVotingSession();

      await voteAdministration.connect(addr1).addVoter(addr2.address, 1);

      const voterTokenBalance = await voteAdministration
        .connect(addr1)
        .getVoterTokenBalance(addr2.address);
      expect(voterTokenBalance).to.be.eq(999);
    });
  });
  describe("setUpVotingSession", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const { voteAdministration, addr3 } = await loadFixture(
        deployVoteAdministration
      );

      await expect(
        voteAdministration.connect(addr3).setUpVotingSession()
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "AccessControlUnauthorizedAccount"
      );
    });
    it("Should NOT be available outside of VotingPowerAllocation window", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await expect(
        voteAdministration.connect(owner).setUpVotingSession()
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "VotingSetUpCannotBeStarted"
      );
    });
    it("Should change the currentWorkflowStatus to VotingSetUp", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdministration
      );

      await voteAdministration.connect(owner).setUpVotingSession();

      expect(await voteAdministration.currentWorkflowStatus()).to.equal(1);
    });

    it("Should emit a broadcast at WorkflowStatus change", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdministration
      );

      await expect(voteAdministration.connect(owner).setUpVotingSession())
        .to.emit(voteAdministration, "WorkflowStatusChange")
        .withArgs(0, 1);
    });
  });
  describe("startVotingSession", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const { voteAdministration, addr3 } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await expect(
        voteAdministration.connect(addr3).startVotingSession()
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "AccessControlUnauthorizedAccount"
      );
    });
    it("Should NOT be available outside of VotingSetUp window", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdministration
      );

      await expect(
        voteAdministration.connect(owner).startVotingSession()
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "VotingSessionCannotBeStarted"
      );
    });
    it("Should change the currentWorkflowStatus to VotingSessionStarted", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration.connect(owner).startVotingSession();

      expect(await voteAdministration.currentWorkflowStatus()).to.equal(2);
    });

    it("Should emit a broadcast at WorkflowStatus change", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await expect(voteAdministration.connect(owner).startVotingSession())
        .to.emit(voteAdministration, "WorkflowStatusChange")
        .withArgs(1, 2);
    });
  });
  describe("endVotingSession", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const { voteAdministration, owner, addr3 } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration.connect(owner).startVotingSession();

      await expect(
        voteAdministration.connect(addr3).endVotingSession()
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "AccessControlUnauthorizedAccount"
      );
    });
    it("Should NOT be available outside of VotingSessionStarted window", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdministration
      );

      await expect(
        voteAdministration.connect(owner).endVotingSession()
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "VotingSessionCannotBeEnded"
      );
    });

    it("Should burn all remaining voter tokens", async function () {
      const { voteAdministration, owner, addr2, addr3 } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration.connect(owner).addVoter(addr2.address, 100);
      await voteAdministration.connect(owner).addVoter(addr3.address, 100);

      await voteAdministration.connect(owner).startVotingSession();

      expect(
        await voteAdministration
          .connect(owner)
          .getVoterTokenBalance(addr2.address)
      ).to.be.eq(100);

      expect(
        await voteAdministration
          .connect(owner)
          .getVoterTokenBalance(addr3.address)
      ).to.be.eq(100);

      await voteAdministration.connect(owner).endVotingSession();

      expect(
        await voteAdministration
          .connect(owner)
          .getVoterTokenBalance(addr2.address)
      ).to.be.eq(0);

      expect(
        await voteAdministration
          .connect(owner)
          .getVoterTokenBalance(addr3.address)
      ).to.be.eq(0);
    });

    it("Should change the currentWorkflowStatus to VotingSessionEnded", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration.connect(owner).startVotingSession();
      await voteAdministration.connect(owner).endVotingSession();

      expect(await voteAdministration.currentWorkflowStatus()).to.equal(3);
    });

    it("Should emit a broadcast at WorkflowStatus change", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration.connect(owner).startVotingSession();

      await expect(voteAdministration.connect(owner).endVotingSession())
        .to.emit(voteAdministration, "WorkflowStatusChange")
        .withArgs(2, 3);
    });
  });
  describe("getVoter", function () {
    it("Should return a custom error for an address that is not a Voter", async function () {
      const { voteAdministration, owner, addr2 } = await loadFixture(
        deployVoteAdministration
      );

      await expect(
        voteAdministration.connect(owner).getVoter(addr2.address)
      ).to.be.revertedWithCustomError(voteAdministration, "AddressIsNotVoter");
    });

    it("Should return a Voter's Struct", async function () {
      const { voteAdministration, addr1, addr2 } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration.connect(addr1).addVoter(addr2.address, 200);

      const voter = await voteAdministration.getVoter(addr2.address);
      expect(voter.voterId).to.equal(1);
      expect(voter.baseVotingPower).to.equal(200);
      expect(voter.voterAddress).to.equal(addr2.address);
    });
  });

  describe("getProposal", function () {
    it("Should return a Proposal's Struct", async function () {
      const { voteAdministration, addr1, addr2 } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );
      const newProposalTitle = "Title";
      const newProposalDescription = "Description";
      await voteAdministration
        .connect(addr1)
        .addProposal(newProposalTitle, newProposalDescription);
      const proposalIndex = voteAdministration.proposalCounter();
      const proposal = await voteAdministration.getProposal(proposalIndex);
      expect(proposal.title).to.equal(newProposalTitle);
      expect(proposal.description).to.equal(newProposalDescription);
    });
  });

  describe("getVoterTokenBalance", function () {
    it("Should return a voter's owned tokens", async function () {
      const { voteAdministration, addr1, addr2 } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration.connect(addr1).addVoter(addr2.address, 100);

      const addr2IsVoter = await voteAdministration
        .connect(addr1)
        .isVoter(addr2.address);

      expect(addr2IsVoter).to.equal(true);

      const voterTokenBalance = await voteAdministration
        .connect(addr1)
        .getVoterTokenBalance(addr2.address);
      expect(voterTokenBalance).to.be.eq(100);
    });
  });
  describe("isVoter", function () {
    it("Should return true if an address has the VOTER_ROLE", async function () {
      const { voteAdministration, addr1, addr2, addr3 } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      const addr3IsNotVoter = await voteAdministration.isVoter(addr3.address);
      expect(addr3IsNotVoter).to.equal(false);

      await voteAdministration.connect(addr1).addVoter(addr2.address, 200);

      const addr2IsVoter = await voteAdministration.isVoter(addr2.address);
      expect(addr2IsVoter).to.equal(true);
    });
  });
  describe("grantAdminRole", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const { voteAdministration, addr2, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployVoteAdministration);

      await expect(
        voteAdministration.connect(addr2).grantAdminRole(addr2.address)
      )
        .to.be.revertedWithCustomError(
          voteAdministration,
          "AccessControlUnauthorizedAccount"
        )
        .withArgs(addr2.address, DEFAULT_ADMIN_ROLE);
    });
    it("Should NOT add the DEFAULT_ADMIN_ROLE to an address that has it already", async function () {
      const { voteAdministration, owner, addr2, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployVoteAdministration);

      const ownerHasDEFAULT_ADMIN_ROLE = await voteAdministration.hasRole(
        DEFAULT_ADMIN_ROLE,
        owner.address
      );
      expect(ownerHasDEFAULT_ADMIN_ROLE).to.equal(true);

      await expect(
        voteAdministration.connect(owner).grantAdminRole(owner.address)
      ).to.be.revertedWithCustomError(
        voteAdministration,
        "AddressAlreadyAdmin"
      );
    });
    it("Should grant the ADMIN_ROLE to the address", async function () {
      const { voteAdministration, owner, addr3, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployVoteAdministration);

      await voteAdministration.connect(owner).grantAdminRole(addr3.address);

      const addr3HasDEFAULT_ADMIN_ROLE = await voteAdministration.hasRole(
        DEFAULT_ADMIN_ROLE,
        addr3.address
      );
      expect(addr3HasDEFAULT_ADMIN_ROLE).to.equal(true);
    });
  });
  describe("getAdmins", function () {
    it("Should return the adminsArray", async function () {
      const { voteAdministration, owner, addr2, addr3 } = await loadFixture(
        deployVoteAdministration
      );

      await voteAdministration.connect(owner).grantAdminRole(addr2.address);
      await voteAdministration.connect(owner).grantAdminRole(addr3.address);

      const adminsArray = await voteAdministration.getAdmins();
      expect(adminsArray).to.eql([owner.address, addr2.address, addr3.address]);
    });
  });
  describe("getProposals", function () {
    it("Should return the proposalsArray", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdminInVotingSetUpWithMINTER_ROLE
      );

      await voteAdministration
        .connect(owner)
        .addProposal("Title1", "Description1");
      await voteAdministration
        .connect(owner)
        .addProposal("Title2", "Description2");
      await voteAdministration
        .connect(owner)
        .addProposal("Title3", "Description3");

      const proposalsArray = await voteAdministration.getProposals();
      expect(proposalsArray).to.eql([
        [1n, "Title1", "Description1", 0n, false, false],

        [2n, "Title2", "Description2", 0n, false, false],

        [3n, "Title3", "Description3", 0n, false, false],
      ]);
    });
  });
  describe("getTokensPerNewVoter", function () {
    it("Should return tokensPerNewVoter", async function () {
      const { voteAdministration, owner } = await loadFixture(
        deployVoteAdministration
      );

      await voteAdministration.connect(owner).setTokensPerNewVoter(999);

      const tokensPerNewVoter = await voteAdministration
        .connect(owner)
        .getTokensPerNewVoter();

      expect(tokensPerNewVoter).to.be.eq(999);
    });
  });
});
