// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract HomeOwnerToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    error AddressAlreadyAdmin();

    constructor(address _initialAdmin) ERC20("HomeOwnerToken", "HOT") {
        _grantRole(DEFAULT_ADMIN_ROLE, _initialAdmin);
    }

    function addMinterBurner(address _minterBurnerContractAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, _minterBurnerContractAddress);
        _grantRole(BURNER_ROLE, _minterBurnerContractAddress);

    }

     function mint(address _voterAddress, uint256 _tokenAmount) external onlyRole(MINTER_ROLE) {
        _mint(_voterAddress, _tokenAmount);
    }

    function addBurner(address _burnerContractAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(BURNER_ROLE, _burnerContractAddress);
    }  

    function burn(address _voterAddress, uint256 _tokenAmount) external onlyRole(BURNER_ROLE) {
        _burn(_voterAddress, _tokenAmount);
    }

    function grantAdminRole(address _adminAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (hasRole(DEFAULT_ADMIN_ROLE, _adminAddress)) {
                revert AddressAlreadyAdmin();
                }           
        _grantRole(DEFAULT_ADMIN_ROLE, _adminAddress);
    }
}