// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VoteAdministration.sol";

contract QuadraticVoting {

    VoteAdministration public voteAdminContract;
    
    constructor(address _voteAdminAddress) {
        voteAdminContract = VoteAdministration(_voteAdminAddress);
    }

    // Struct to hold vote details - could be expanded as needed
    struct VoteDetail {
        uint256 votes;
        uint256 creditsUsed;
    }

    // Mapping from voter to proposal to VoteDetail
    mapping(address => mapping(uint256 => VoteDetail)) public voteDetails;

    event VotesCast(address indexed voter, uint256 indexed proposalId, uint256 votes, uint256 creditsUsed);

    error UserLacksVoterRole();

    // Cast votes function
    function castVotes(uint256 proposalId, uint256 votes) public {
        // Ensure the caller is a registered voter in VoteAdministration
        if (!voteAdminContract.hasRole(voteAdminContract.VOTER_ROLE(), msg.sender)) {
                  revert UserLacksVoterRole();
                  } 
           
        // Calculate the credits required for the given number of votes (quadratic cost)
        uint256 creditsRequired = votes ** 2;

        // Here, you'd typically check the voter has enough credits, which requires
        // a mechanism to track and update voter credits in VoteAdministration or here

        // Assume a function in VoteAdministration to check and update credits (to be implemented)
        // require(voteAdmin.useCredits(msg.sender, creditsRequired), "Insufficient credits");

        // Record the vote details
        voteDetails[msg.sender][proposalId] = VoteDetail(votes, creditsRequired);

        // Emit an event for the vote casting
        emit VotesCast(msg.sender, proposalId, votes, creditsRequired);

        // Additional logic to handle the vote impact on the proposal can be added,
        // depending on how you've structured proposal voting in VoteAdministration
    }

    // Function to retrieve vote details for a voter and proposal
    function getVoteDetails(address voter, uint256 proposalId) public view returns (VoteDetail memory) {
        return voteDetails[voter][proposalId];
    }

    // Additional functions as needed for quadratic voting logic
}
