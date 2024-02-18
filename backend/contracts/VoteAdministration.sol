// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./HomeOwnerToken.sol";

/// @title Vote Administration for managing voting in a Home Owner's Association context
/// @dev Utilizes AccessControl for role management and interacts with HomeOwnerToken for voting incentives
contract VoteAdministration is AccessControl {
    HomeOwnerToken public tokenContract;
    uint256 public proposalCounter;
    uint256 public voterCounter;
    uint256 private tokensPerNewVoter = 100;

    address[] private adminsArray;

    bytes32 public constant VOTER_ROLE = keccak256("VOTER_ROLE");

    struct Proposal {
        uint256 proposalId;
        string title;
        string description;
    }
    Proposal[] private proposalsArray;
    mapping(uint256 => Proposal) public proposals;

    struct Voter {
        uint256 voterId;
        uint256 baseVotingPower;
        address voterAddress;
    }
    Voter[] private votersArray;
    mapping(address => Voter) public voters;

    enum WorkflowStatus {
        VotingPowerAllocation,
        VotingSetUp,
        VotingSessionStarted,
        VotingSessionEnded
    }

    WorkflowStatus public currentWorkflowStatus;

    /// @notice Emitted when a new voter is registered
    /// @param voterAddress Address of the newly registered voter
    /// @param voterId ID of the newly registered voter
    event VoterRegistered(address voterAddress, uint256 voterId);

    /// @notice Emitted when a new proposal is registered
    /// @param title Title of the newly registered proposal
    /// @param proposalId ID of the newly registered proposal
    event ProposalRegistered(string title, uint256 proposalId);

    /// @notice Emitted when the workflow status changes
    /// @param previousStatus The previous workflow status
    /// @param newStatus The new workflow status
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );

    error ContractLacksMinterRole();
    error AddressAlreadyVoter();
    error AddressIsNotVoter();
    error CannotSetTokensOutsideOfVotingPowerAllocationWindow();
    error CannotAddVotersOutsideOfVotingSetUp();
    error CannotAddProposalsOutsideOfVotingSetUp();
    error VotingSetUpCannotBeStarted();
    error VotingSessionCannotBeStarted();
    error VotingSessionCannotBeEnded();
    error AddressAlreadyAdmin();

    /// @notice Initializes the VoteAdministration contract
    /// @param _tokenContractAddress Address of the HomeOwnerToken contract
    /// @param _initialAdmin Address of the initial administrator
    constructor(address _tokenContractAddress, address _initialAdmin) {
        tokenContract = HomeOwnerToken(_tokenContractAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, _initialAdmin);
        adminsArray.push(_initialAdmin);
    }

    /// @notice Registers a new voter with a specified base voting power
    /// @dev Requires DEFAULT_ADMIN_ROLE, can only be called during VotingSetUp phase
    /// @param _voterAddress Address of the new voter
    /// @param _baseVotingPower Base voting power for the new voter
    function addVoter(
        address _voterAddress,
        uint256 _baseVotingPower
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if (currentWorkflowStatus != WorkflowStatus.VotingSetUp) {
            revert CannotAddVotersOutsideOfVotingSetUp();
        }
        if (
            !tokenContract.hasRole(tokenContract.MINTER_ROLE(), address(this))
        ) {
            revert ContractLacksMinterRole();
        }
        if (hasRole(VOTER_ROLE, _voterAddress)) {
            revert AddressAlreadyVoter();
        }
        _grantRole(VOTER_ROLE, _voterAddress);
        tokenContract.mint(_voterAddress, tokensPerNewVoter);

        voterCounter += 1;

        Voter memory newVoter = Voter({
            voterId: voterCounter,
            voterAddress: _voterAddress,
            baseVotingPower: _baseVotingPower
        });

        voters[_voterAddress] = newVoter;
        votersArray.push(newVoter);
        emit VoterRegistered(_voterAddress, voterCounter);
    }

    /// @notice Registers a new proposal with a title and description
    /// @dev Requires DEFAULT_ADMIN_ROLE, can only be called during VotingSetUp phase
    /// @param _title Title of the proposal
    /// @param _description Description of the proposal
    function addProposal(
        string calldata _title,
        string calldata _description
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if (currentWorkflowStatus != WorkflowStatus.VotingSetUp) {
            revert CannotAddProposalsOutsideOfVotingSetUp();
        }

        proposalCounter += 1;

        Proposal memory newProposal = Proposal({
            proposalId: proposalCounter,
            title: _title,
            description: _description
        });

        proposals[proposalCounter] = newProposal;
        proposalsArray.push(newProposal);

        emit ProposalRegistered(_title, proposalCounter);
    }

    /// @notice Retrieves a voter's information by address
    /// @dev Requires the address to have the VOTER_ROLE
    /// @param _voterAddress The address of the voter to retrieve
    /// @return Voter structure including voter ID, base voting power, and address
    function getVoter(
        address _voterAddress
    ) public view returns (Voter memory) {
        if (!hasRole(VOTER_ROLE, _voterAddress)) {
            revert AddressIsNotVoter();
        }
        return voters[_voterAddress];
    }

    /// @notice Retrieves a proposal's information by ID
    /// @param _proposalId The ID of the proposal to retrieve
    /// @return Proposal structure including proposal ID, title, and description
    function getProposal(
        uint256 _proposalId
    ) external view returns (Proposal memory) {
        return proposals[_proposalId];
    }

    /// @notice Checks if a proposal exists for the given ID
    /// @param _proposalId The ID of the proposal to check
    /// @return true if the proposal exists, otherwise false
    function proposalExists(uint256 _proposalId) public view returns (bool) {
        return bytes(proposals[_proposalId].title).length > 0;
    }

    /// @notice Checks if the given address is a registered voter
    /// @param _addr The address to check
    /// @return true if the address has the VOTER_ROLE, otherwise false
    function isVoter(address _addr) external view returns (bool) {
        return hasRole(VOTER_ROLE, _addr);
    }

    /// @notice Retrieves the token balance of a voter
    /// @param _addr The address of the voter
    /// @return The token balance of the voter
    function getVoterTokenBalance(address _addr) public view returns (uint256) {
        return tokenContract.balanceOf(_addr);
    }

    /// @notice Sets the number of tokens awarded to new voters
    /// @dev Can only be called during the VotingPowerAllocation phase and requires DEFAULT_ADMIN_ROLE
    /// @param _tokensPerNewVoter The number of tokens to be awarded to each new voter
    function setTokensPerNewVoter(
        uint256 _tokensPerNewVoter
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if (currentWorkflowStatus != WorkflowStatus.VotingPowerAllocation) {
            revert CannotSetTokensOutsideOfVotingPowerAllocationWindow();
        }

        tokensPerNewVoter = _tokensPerNewVoter;
    }

    /// @notice Transitions the workflow to the VotingSetUp phase
    /// @dev Requires DEFAULT_ADMIN_ROLE, can only be called from the VotingPowerAllocation phase
    function setUpVotingSession() external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (currentWorkflowStatus != WorkflowStatus.VotingPowerAllocation) {
            revert VotingSetUpCannotBeStarted();
        }
        currentWorkflowStatus = WorkflowStatus.VotingSetUp;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingPowerAllocation,
            WorkflowStatus.VotingSetUp
        );
    }

    /// @notice Starts the voting session
    /// @dev Requires DEFAULT_ADMIN_ROLE, can only be called from the VotingSetUp phase
    function startVotingSession() external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (currentWorkflowStatus != WorkflowStatus.VotingSetUp) {
            revert VotingSessionCannotBeStarted();
        }
        currentWorkflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSetUp,
            WorkflowStatus.VotingSessionStarted
        );
    }

    /// @notice Ends the voting session
    /// @dev Requires DEFAULT_ADMIN_ROLE, can only be called from the VotingSessionStarted phase
    function endVotingSession() external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (currentWorkflowStatus != WorkflowStatus.VotingSessionStarted) {
            revert VotingSessionCannotBeEnded();
        }

        for (uint256 i = 0; i < votersArray.length; i++) {
            uint256 voterBalance = tokenContract.balanceOf(
                votersArray[i].voterAddress
            );
            if (voterBalance > 0) {
                tokenContract.burn(votersArray[i].voterAddress, voterBalance);
            }
        }

        currentWorkflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    /// @notice Grants the admin role to a specified address
    /// @dev Requires DEFAULT_ADMIN_ROLE
    /// @param _adminAddress The address to be granted admin privileges
    function grantAdminRole(
        address _adminAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (hasRole(DEFAULT_ADMIN_ROLE, _adminAddress)) {
            revert AddressAlreadyAdmin();
        }
        _grantRole(DEFAULT_ADMIN_ROLE, _adminAddress);
        adminsArray.push(_adminAddress);
    }

    /// @notice Retrieves a list of admin addresses
    /// @return An array of admin addresses
    function getAdmins() external view returns (address[] memory) {
        return adminsArray;
    }

    /// @notice Retrieves all proposals
    /// @return An array of Proposal structures
    function getProposals() external view returns (Proposal[] memory) {
        return proposalsArray;
    }

    /// @notice Retrieves the number of tokens awarded to new voters
    /// @return The number of tokens awarded to each new voter
    function getTokensPerNewVoter() external view returns (uint256) {
        return tokensPerNewVoter;
    }

    /// @notice Retrieves a list of all proposal IDs
    /// @dev Requires DEFAULT_ADMIN_ROLE
    /// @return An array of all proposal IDs
    function getProposalIds()
        external
        view
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (uint256[] memory)
    {
        uint256[] memory proposalIds = new uint256[](proposalCounter);
        for (uint256 i = 1; i <= proposalCounter; i++) {
            proposalIds[i - 1] = i;
        }
        return proposalIds;
    }

    /// @notice Retrieves a list of all voter addresses
    /// @dev Requires DEFAULT_ADMIN_ROLE
    /// @return An array of voter addresses
    function getVoterAddresses()
        external
        view
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (address[] memory)
    {
        address[] memory voterAddresses = new address[](voterCounter);
        for (uint256 i = 0; i < voterCounter; i++) {
            voterAddresses[i] = votersArray[i].voterAddress;
        }
        return voterAddresses;
    }
}
