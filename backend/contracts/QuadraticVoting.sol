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

    constructor(
        address _tokenContractAddress,
        address _voteAdminContractAddress,
        address _initialAdmin
    ) {
        tokenContract = HomeOwnerToken(_tokenContractAddress);
        voteAdminContract = VoteAdministration(_voteAdminContractAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, _initialAdmin);
        adminsArray.push(_initialAdmin);
    }

    struct VoteDetail {
        uint256 votesAgainst;
        uint256 votesFor;
    }

    mapping(address => mapping(uint256 => VoteDetail)) public voteDetails;

    event VoteCast(
        address indexed voter,
        uint256 indexed proposalId,
        bool voteDecision,
        uint256 additionalVotingPower
    );

    error UserLacksVoterRole();
    error VoterLacksCredits();
    error AddressAlreadyAdmin();
    error ProposalDoesNotExist();
    error VoterHasAlreadyVoted();

    function castVote(
        uint256 proposalId,
        bool voteDecision,
        uint256 additionalVotingPower
    ) public {
        if (
            !voteAdminContract.hasRole(
                voteAdminContract.VOTER_ROLE(),
                msg.sender
            )
        ) {
            revert UserLacksVoterRole();
        }

        if (!voteAdminContract.proposalExists(proposalId)) {
            revert ProposalDoesNotExist();
        }

        VoteDetail storage detail = voteDetails[msg.sender][proposalId];
        if (detail.votesFor > 0 || detail.votesAgainst > 0) {
            revert VoterHasAlreadyVoted();
        }

        uint256 requiredTokens = additionalVotingPower ** 2;

        uint256 availableTokens = tokenContract.balanceOf(msg.sender);
        if (availableTokens < requiredTokens) {
            revert VoterLacksCredits();
        }

        uint256 baseVotingPower = voteAdminContract
            .getVoter(msg.sender)
            .baseVotingPower;
        uint256 totalVotingPower = baseVotingPower + additionalVotingPower;

        //to be tested
        if (voteDecision) {
            voteDetails[msg.sender][proposalId].votesFor += totalVotingPower;
        } else {
            voteDetails[msg.sender][proposalId]
                .votesAgainst += totalVotingPower;
        }

        tokenContract.burn(msg.sender, requiredTokens);

        emit VoteCast(
            msg.sender,
            proposalId,
            voteDecision,
            additionalVotingPower
        );
    }

    function grantAdminRole(
        address _adminAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
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
