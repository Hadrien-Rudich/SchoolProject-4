// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract HomeOwnerToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(address initialOwner) ERC20("HomeOwnerToken", "HOT") {
        _grantRole(DEFAULT_ADMIN_ROLE, initialOwner);
    }

    function addMinter(address minterAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, minterAddress);
    }

    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function getTokenBalance(address account) external view returns (uint256) {
        return balanceOf(account);
    }

}