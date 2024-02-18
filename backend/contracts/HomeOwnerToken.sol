// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title A token contract for Home Owners
/// @dev Extends ERC20 Token Standard with AccessControl for minting and burning
contract HomeOwnerToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    address[] private adminsArray;

    error AddressAlreadyAdmin();

    /// @notice Constructor to create HomeOwnerToken
    /// @param _initialAdmin The initial administrator's address, granted default admin role
    constructor(address _initialAdmin) ERC20("HomeOwnerToken", "HOT") {
        _grantRole(DEFAULT_ADMIN_ROLE, _initialAdmin);
        adminsArray.push(_initialAdmin);
    }

    /// @notice Adds a contract address as both minter and burner
    /// @dev Requires DEFAULT_ADMIN_ROLE
    /// @param _minterBurnerContractAddress Address of the contract to grant roles
    function addMinterBurner(
        address _minterBurnerContractAddress
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, _minterBurnerContractAddress);
        _grantRole(BURNER_ROLE, _minterBurnerContractAddress);
    }

    /// @notice Mints tokens to a specified address
    /// @dev Requires MINTER_ROLE
    /// @param _voterAddress The address to mint tokens to
    /// @param _tokenAmount The amount of tokens to mint
    function mint(
        address _voterAddress,
        uint256 _tokenAmount
    ) external onlyRole(MINTER_ROLE) {
        _mint(_voterAddress, _tokenAmount);
    }

    /// @notice Grants the burner role to a contract address
    /// @dev Requires DEFAULT_ADMIN_ROLE
    /// @param _burnerContractAddress The address to grant burner role
    function addBurner(
        address _burnerContractAddress
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(BURNER_ROLE, _burnerContractAddress);
    }

    /// @notice Burns tokens from a specified address
    /// @dev Requires BURNER_ROLE
    /// @param _voterAddress The address to burn tokens from
    /// @param _tokenAmount The amount of tokens to burn
    function burn(
        address _voterAddress,
        uint256 _tokenAmount
    ) external onlyRole(BURNER_ROLE) {
        _burn(_voterAddress, _tokenAmount);
    }

    /// @notice Grants admin role to an address
    /// @dev Requires DEFAULT_ADMIN_ROLE, reverts if address is already an admin
    /// @param _adminAddress The address to grant admin role
    function grantAdminRole(
        address _adminAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (hasRole(DEFAULT_ADMIN_ROLE, _adminAddress)) {
            revert AddressAlreadyAdmin();
        }
        _grantRole(DEFAULT_ADMIN_ROLE, _adminAddress);
        adminsArray.push(_adminAddress);
    }

    /// @notice Returns the list of admin addresses
    /// @return An array of admin addresses
    function getAdmins() external view returns (address[] memory) {
        return adminsArray;
    }
}
