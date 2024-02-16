// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./VoteAdministration.sol";
import "./HomeOwnerToken.sol";

contract QuadraticVoting is AccessControl {
    bytes32 public constant VOTE_MANAGER_ROLE = keccak256("VOTE_MANAGER_ROLE");
    VoteAdministration public voteAdminContract;
    HomeOwnerToken public tokenContract;

    address[] private adminsArray;

    
    constructor(address _tokenContractAddress, address _voteAdminContractAddress, address _initialAdmin) {
        tokenContract = HomeOwnerToken(_tokenContractAddress);
        voteAdminContract = VoteAdministration(_voteAdminContractAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, _initialAdmin);
        adminsArray.push(_initialAdmin);
    }

    // Struct to hold vote details - could be expanded as needed
    struct VoteDetail {
        uint256 votesAgainst;
        uint256 votesFor;
        
    }

    mapping(address => mapping(uint256 => VoteDetail)) public voteDetails;

    event VoteCast(address indexed voter, uint256 indexed proposalId, string voteDecision, uint256 additionalVotingPower);

    error UserLacksVoterRole();
    error VoterLacksCredits();
    error AddressAlreadyAdmin();

    function castVote(uint256 proposalId, string calldata voteDecision, uint256 additionalVotingPower) public {
        if (!voteAdminContract.hasRole(voteAdminContract.VOTER_ROLE(), msg.sender)) {
                  revert UserLacksVoterRole();
                  } 

        uint256 votingPower = voteAdminContract.getVoterTokenBalance(msg.sender);
        if (votingPower < additionalVotingPower** 2) {
            revert VoterLacksCredits();
        }

        tokenContract.burn(msg.sender, additionalVotingPower** 2);
        emit VoteCast(msg.sender, proposalId, voteDecision, additionalVotingPower);

    }

   function grantAdminRole(address _adminAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (hasRole(DEFAULT_ADMIN_ROLE, _adminAddress)) {
                revert AddressAlreadyAdmin();
                }           
        _grantRole(DEFAULT_ADMIN_ROLE, _adminAddress);
        adminsArray.push(_adminAddress);

    }

      function getAdmins() external view returns (address[] memory) {
        return adminsArray;
    }
   
}

