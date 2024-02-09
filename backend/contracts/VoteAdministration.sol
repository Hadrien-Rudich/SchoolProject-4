// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./HomeOwnerToken.sol";

contract VoteAdministration is AccessControl {

    struct Proposal {
        uint256 proposalId;
        string title;
        string description;
        uint voteCount;
        bool votingIsClosed;
        bool isAccepted;
        // mapping(address => bool) votersInFavor;
    }

    uint256 public proposalCounter;
    Proposal[] public proposalsArray;

    mapping(uint256 => Proposal) public proposals;

    struct Voter {
        // Tracks the amount of voting power a voter has allocated to each proposal.
        // This represents the square root of the votes cast.
        mapping(uint256 => uint256) votingPowerAllocated;
        
    }
    
    HomeOwnerToken public tokenContract;
    bytes32 public constant VOTER_ROLE = keccak256("VOTER_ROLE");
    uint256 private tokensPerNewVoter = 100;
    mapping(address => Voter) private voters;

    enum WorkflowStatus {
        VotingPowerAllocation,
        VotingSetUp,
        VotingSessionStarted,
        VotingSessionEnded
    }

    WorkflowStatus public currentWorkflowStatus;

    event VoterRegistered(address voterAddress);
    event ProposalRegistered(uint256 proposalId);
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);

    error ContractLacksMinterRole();
    error AddressAlreadyVoter();
    error CannotSetTokensOutsideOfVotingPowerAllocationWindow();
    error CannotAddVotersOutsideOfVotingSetUp();
    error CannotAddProposalsOutsideOfVotingSetUp();
    error VotingSetUpCannotBeStarted();
    error VotingSessionCannotBeStarted();
    error VotingSessionCannotBeEnded();

    constructor(address _tokenContractAddress, address initialOwner) {
        tokenContract = HomeOwnerToken(_tokenContractAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, initialOwner);
    }

   function addVoter(address _addr) public onlyRole(DEFAULT_ADMIN_ROLE) {
    if (currentWorkflowStatus != WorkflowStatus.VotingSetUp) {
            revert CannotAddVotersOutsideOfVotingSetUp();
        }
       if (!tokenContract.hasRole(tokenContract.MINTER_ROLE(), address(this))) {
            revert ContractLacksMinterRole();
            }   
        if (hasRole(VOTER_ROLE, _addr)) {
            revert AddressAlreadyVoter();
            }    
        _grantRole(VOTER_ROLE, _addr);
        tokenContract.mint(_addr, tokensPerNewVoter);
        emit VoterRegistered(_addr);
    }

    // function getProposal(uint256 proposalId) external view returns (string memory title, string memory description, uint voteCount, bool votingIsClosed, bool isAccepted) {
    //     Proposal storage proposal = proposals[proposalId];
    //     return (proposal.title, proposal.description, proposal.voteCount, proposal.votingIsClosed, proposal.isAccepted);
    // }

    function isVoter(address _addr) external view returns (bool) {
        return hasRole(VOTER_ROLE, _addr);
    }

    function getVoterTokenBalance(address _addr) public view returns (uint256) {   
        return tokenContract.balanceOf(_addr);
    }

function addProposal(string calldata _title, string calldata _description) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if (currentWorkflowStatus != WorkflowStatus.VotingSetUp) {
            revert CannotAddProposalsOutsideOfVotingSetUp();
        }
        
        proposalCounter += 1; 

        Proposal memory newProposal = Proposal({
            proposalId: proposalCounter,
            title: _title,
            description: _description,
            voteCount: 0,
            votingIsClosed: false,
            isAccepted: false
        });

        proposals[proposalCounter] = newProposal;


        proposalsArray.push(newProposal);
        
        emit ProposalRegistered(proposalCounter);
    }   

    function setTokensPerNewVoter(uint256 _tokensPerNewVoter) public onlyRole(DEFAULT_ADMIN_ROLE) {
       
          if (currentWorkflowStatus != WorkflowStatus.VotingPowerAllocation) {
            revert CannotSetTokensOutsideOfVotingPowerAllocationWindow();
        }
        
        tokensPerNewVoter = _tokensPerNewVoter;
    }

      function setUpVotingSession() external onlyRole(DEFAULT_ADMIN_ROLE) {
      if (currentWorkflowStatus != WorkflowStatus.VotingPowerAllocation) {
            revert VotingSetUpCannotBeStarted();
        }
        currentWorkflowStatus = WorkflowStatus.VotingSetUp;
        emit WorkflowStatusChange(WorkflowStatus.VotingPowerAllocation, WorkflowStatus.VotingSetUp);
    }

    function startVotingSession() external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (currentWorkflowStatus != WorkflowStatus.VotingSetUp) {
            revert VotingSessionCannotBeStarted();
        }
        currentWorkflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.VotingSetUp, WorkflowStatus.VotingSessionStarted);
    }

    function endVotingSession() external onlyRole(DEFAULT_ADMIN_ROLE) {
       if (currentWorkflowStatus != WorkflowStatus.VotingSessionStarted) {
            revert VotingSessionCannotBeEnded();
        }

        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
        currentWorkflowStatus = WorkflowStatus.VotingSessionEnded;
    }
}
