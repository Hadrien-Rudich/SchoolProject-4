// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./VoteAdministration.sol";
import "./HomeOwnerToken.sol";

/// @title Quadratic Voting system for Home Owner's Association
/// @dev Utilizes AccessControl for role management and interacts with VoteAdministration and HomeOwnerToken contracts
contract QuadraticVoting is AccessControl {
    bytes32 public constant VOTE_MANAGER_ROLE = keccak256("VOTE_MANAGER_ROLE");
    VoteAdministration public voteAdminContract;
    HomeOwnerToken public tokenContract;

    address[] private adminsArray;

    /// @notice Initializes a new QuadraticVoting contract
    /// @param _tokenContractAddress Address of the HomeOwnerToken contract
    /// @param _voteAdminContractAddress Address of the VoteAdministration contract
    /// @param _initialAdmin Address of the initial admin granted DEFAULT_ADMIN_ROLE
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

    /// @notice Emitted when a vote is cast
    /// @param voter The address of the voter
    /// @param proposalId The ID of the proposal being voted on
    /// @param voteDecision The decision of the vote (true for "for", false for "against")
    /// @param additionalVotingPower The amount of additional voting power applied, based on quadratic voting
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

    /// @notice Casts a vote on a proposal using quadratic voting
    /// @dev Requires the caller to have the VOTER_ROLE in VoteAdministration
    /// @param proposalId The ID of the proposal to vote on
    /// @param voteDecision The voter's decision (true for "for", false for "against")
    /// @param quadraticVotingPower The square root of the voter's desired voting power
    function castVote(
        uint256 proposalId,
        bool voteDecision,
        uint256 quadraticVotingPower
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

        uint256 requiredHOT = quadraticVotingPower ** 2;

        uint256 availableHOT = tokenContract.balanceOf(msg.sender);
        if (availableHOT < requiredHOT) {
            revert VoterLacksCredits();
        }

        uint256 baseVotingPower = voteAdminContract
            .getVoter(msg.sender)
            .baseVotingPower;
        uint256 totalVotingPower = baseVotingPower + requiredHOT;

        if (voteDecision) {
            voteDetails[msg.sender][proposalId].votesFor += totalVotingPower;
        } else {
            voteDetails[msg.sender][proposalId]
                .votesAgainst += totalVotingPower;
        }

        tokenContract.burn(msg.sender, requiredHOT);

        emit VoteCast(
            msg.sender,
            proposalId,
            voteDecision,
            quadraticVotingPower
        );
    }

    /// @notice Grants admin role to a specified address
    /// @dev Requires DEFAULT_ADMIN_ROLE
    /// @param _adminAddress The address to be granted the admin role
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

    /// @notice Retrieves the total votes for and against a given proposal
    /// @dev Requires DEFAULT_ADMIN_ROLE
    /// @param proposalId The ID of the proposal
    /// @return totalVotesFor Total votes in favor of the proposal
    /// @return totalVotesAgainst Total votes against the proposal
    function getVoteSummary(
        uint256 proposalId
    )
        external
        view
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (uint256 totalVotesFor, uint256 totalVotesAgainst)
    {
        if (!voteAdminContract.proposalExists(proposalId)) {
            revert ProposalDoesNotExist();
        }

        address[] memory voterAddresses = voteAdminContract.getVoterAddresses();
        for (uint i = 0; i < voterAddresses.length; i++) {
            VoteDetail storage detail = voteDetails[voterAddresses[i]][
                proposalId
            ];
            totalVotesFor += detail.votesFor;
            totalVotesAgainst += detail.votesAgainst;
        }
    }
}
