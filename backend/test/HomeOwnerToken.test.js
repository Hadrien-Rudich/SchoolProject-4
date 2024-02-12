const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

async function deployHomeOwnerToken() {
  const [owner, addr2, addr3] = await ethers.getSigners();
  const contract = await ethers.getContractFactory("HomeOwnerToken");
  const homeOwnerToken = await contract.deploy(owner.address);

  const DEFAULT_ADMIN_ROLE =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  const MINTER_ROLE =
    "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";

  const BURNER_ROLE =
    "0x3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a848";

  return {
    homeOwnerToken,
    owner,
    addr2,
    addr3,
    DEFAULT_ADMIN_ROLE,
    MINTER_ROLE,
    BURNER_ROLE,
  };
}

describe("HomeOwnerToken Contract Tests", function () {
  describe("Deployment", function () {
    it("Should return a valid deployment contract address", async function () {
      const { homeOwnerToken } = await loadFixture(deployHomeOwnerToken);
      expect(homeOwnerToken.target).to.not.equal(undefined);
    });
    it("Should grant the DEFAULT_ADMIN_ROLE to the owner", async function () {
      const { homeOwnerToken, owner, addr2, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployHomeOwnerToken);

      const ownerHasDEFAULT_ADMIN_ROLE = await homeOwnerToken.hasRole(
        DEFAULT_ADMIN_ROLE,
        owner.address
      );
      expect(ownerHasDEFAULT_ADMIN_ROLE).to.equal(true);

      const addr2HasDEFAULT_ADMIN_ROLE = await homeOwnerToken.hasRole(
        DEFAULT_ADMIN_ROLE,
        addr2.address
      );
      expect(addr2HasDEFAULT_ADMIN_ROLE).to.equal(false);
    });
  });
  describe("addMinterBurner", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const { homeOwnerToken, addr2, addr3, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployHomeOwnerToken);

      await expect(homeOwnerToken.connect(addr2).addMinterBurner(addr3.address))
        .to.be.revertedWithCustomError(
          homeOwnerToken,
          "AccessControlUnauthorizedAccount"
        )
        .withArgs(addr2.address, DEFAULT_ADMIN_ROLE);
    });
    it("Should grant the MINTER_ROLE to an address", async function () {
      const { homeOwnerToken, owner, addr2, addr3, MINTER_ROLE } =
        await loadFixture(deployHomeOwnerToken);

      await homeOwnerToken.connect(owner).addMinterBurner(addr3.address);

      const addr3HasMINTER_ROLE = await homeOwnerToken.hasRole(
        MINTER_ROLE,
        addr3.address
      );
      expect(addr3HasMINTER_ROLE).to.equal(true);

      const addr2HasMINTER_ROLE = await homeOwnerToken.hasRole(
        MINTER_ROLE,
        addr2.address
      );
      expect(addr2HasMINTER_ROLE).to.equal(false);
    });
  });

  describe("mint", function () {
    it("Should NOT be available to roles other than MINTER_ROLE", async function () {
      const { homeOwnerToken, owner, MINTER_ROLE } = await loadFixture(
        deployHomeOwnerToken
      );

      await expect(homeOwnerToken.connect(owner).mint(owner.address, 999))
        .to.be.revertedWithCustomError(
          homeOwnerToken,
          "AccessControlUnauthorizedAccount"
        )
        .withArgs(owner.address, MINTER_ROLE);
    });
    it("Should allow the MINTER_ROLE to mint tokens and send them to an address", async function () {
      const { homeOwnerToken, owner, addr3 } = await loadFixture(
        deployHomeOwnerToken
      );

      const tokensToBeAdded = 99999;

      const initialAddr2TokenBalance = await homeOwnerToken
        .connect(owner)
        .balanceOf(addr3.address);

      await homeOwnerToken.connect(owner).addMinterBurner(owner.address);
      await homeOwnerToken.connect(owner).mint(addr3.address, tokensToBeAdded);

      const addr2TokenBalanceAfterMint = await homeOwnerToken
        .connect(owner)
        .balanceOf(addr3.address);

      const expectedAddr2TokenBalance =
        parseInt(initialAddr2TokenBalance) + tokensToBeAdded;

      expect(addr2TokenBalanceAfterMint).to.equal(expectedAddr2TokenBalance);
    });
  });

  describe("addBurner", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const { homeOwnerToken, addr2, addr3, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployHomeOwnerToken);

      await expect(homeOwnerToken.connect(addr2).addBurner(addr3.address))
        .to.be.revertedWithCustomError(
          homeOwnerToken,
          "AccessControlUnauthorizedAccount"
        )
        .withArgs(addr2.address, DEFAULT_ADMIN_ROLE);
    });
    it("Should grant the BURNER_ROLE to an address", async function () {
      const { homeOwnerToken, owner, addr2, addr3, BURNER_ROLE } =
        await loadFixture(deployHomeOwnerToken);

      await homeOwnerToken.connect(owner).addBurner(addr2.address);

      const addr2HasBURNER_ROLE = await homeOwnerToken.hasRole(
        BURNER_ROLE,
        addr2.address
      );
      expect(addr2HasBURNER_ROLE).to.equal(true);

      const addr3HasBURNER_ROLE = await homeOwnerToken.hasRole(
        BURNER_ROLE,
        addr3.address
      );
      expect(addr3HasBURNER_ROLE).to.equal(false);
    });
  });

  describe("burn", function () {
    it("Should NOT be available to roles other than BURNER_ROLE", async function () {
      const { homeOwnerToken, owner, BURNER_ROLE } = await loadFixture(
        deployHomeOwnerToken
      );

      await expect(homeOwnerToken.connect(owner).burn(owner.address, 999))
        .to.be.revertedWithCustomError(
          homeOwnerToken,
          "AccessControlUnauthorizedAccount"
        )
        .withArgs(owner.address, BURNER_ROLE);
    });
    it("Should allow the BURNER_ROLE to burn tokens from an address", async function () {
      const { homeOwnerToken, owner, addr2, addr3 } = await loadFixture(
        deployHomeOwnerToken
      );

      const tokensToBeAdded = 777;

      const initialAddr3TokenBalance = await homeOwnerToken
        .connect(owner)
        .balanceOf(addr3.address);

      await homeOwnerToken.connect(owner).addMinterBurner(owner.address);
      await homeOwnerToken.connect(owner).mint(addr3.address, tokensToBeAdded);
      await homeOwnerToken.connect(owner).addBurner(addr2.address);

      const addr3TokenBalanceAfterMint = await homeOwnerToken
        .connect(owner)
        .balanceOf(addr3.address);

      const expectedAddr3TokenBalance =
        parseInt(initialAddr3TokenBalance) + tokensToBeAdded;

      expect(addr3TokenBalanceAfterMint).to.equal(expectedAddr3TokenBalance);

      await homeOwnerToken
        .connect(addr2)
        .burn(addr3.address, expectedAddr3TokenBalance);

      expect(
        await homeOwnerToken.connect(owner).balanceOf(addr3.address)
      ).to.equal(0);
    });
  });
  describe("grantAdminRole", function () {
    it("Should NOT be available to roles other than DEFAULT_ADMIN_ROLE", async function () {
      const { homeOwnerToken, addr2, addr3, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployHomeOwnerToken);

      await expect(homeOwnerToken.connect(addr2).grantAdminRole(addr3.address))
        .to.be.revertedWithCustomError(
          homeOwnerToken,
          "AccessControlUnauthorizedAccount"
        )
        .withArgs(addr2.address, DEFAULT_ADMIN_ROLE);
    });
    it("Should NOT add the DEFAULT_ADMIN_ROLE to an address that has it already", async function () {
      const { homeOwnerToken, owner, DEFAULT_ADMIN_ROLE } = await loadFixture(
        deployHomeOwnerToken
      );

      const ownerHasDEFAULT_ADMIN_ROLE = await homeOwnerToken.hasRole(
        DEFAULT_ADMIN_ROLE,
        owner.address
      );
      expect(ownerHasDEFAULT_ADMIN_ROLE).to.equal(true);

      await expect(
        homeOwnerToken.connect(owner).grantAdminRole(owner.address)
      ).to.be.revertedWithCustomError(homeOwnerToken, "AddressAlreadyAdmin");
    });
    it("Should grant the ADMIN_ROLE to the address", async function () {
      const { homeOwnerToken, owner, addr2, DEFAULT_ADMIN_ROLE } =
        await loadFixture(deployHomeOwnerToken);

      await homeOwnerToken.connect(owner).grantAdminRole(addr2.address);

      const addr2HasDEFAULT_ADMIN_ROLE = await homeOwnerToken.hasRole(
        DEFAULT_ADMIN_ROLE,
        addr2.address
      );
      expect(addr2HasDEFAULT_ADMIN_ROLE).to.equal(true);
    });
  });
});
