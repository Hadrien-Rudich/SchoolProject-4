// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./HomeOwnerToken.sol";

contract VoteAdministration is AccessControl {

    HomeOwnerToken public tokenContract;
    uint256 public proposalCounter;
    uint256 public voterCounter;
    uint256 public tokensPerNewVoter = 100;

    bytes32 public constant VOTER_ROLE = keccak256("VOTER_ROLE");

    struct Proposal {
        uint256 proposalId;
        string title;
        string description;
        uint256 voteCount;
        bool votingIsClosed;
        bool isAccepted;
    }
    Proposal[] public proposalsArray;
    mapping(uint256 => Proposal) public proposals;

    struct Voter {
        uint256 voterId;
        uint256 baseVotingPower;        
        address voterAddress;
    }
    Voter[] public votersArray;
    mapping(address => Voter) public voters;

    enum WorkflowStatus {
        VotingPowerAllocation,
        VotingSetUp,
        VotingSessionStarted,
        VotingSessionEnded
    }

    WorkflowStatus public currentWorkflowStatus;

    event VoterRegistered(address voterAddress, uint256 voterId);
    event ProposalRegistered(string title, uint256 proposalId);
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);

    error ContractLacksMinterRole();
    error AddressAlreadyVoter();
    error AddressIsNotVoter();
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

   function addVoter(address _voterAddress, uint256 _baseVotingPower) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if (currentWorkflowStatus != WorkflowStatus.VotingSetUp) {
                revert CannotAddVotersOutsideOfVotingSetUp();
                }
        if (!tokenContract.hasRole(tokenContract.MINTER_ROLE(), address(this))) {
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

        emit ProposalRegistered(_title, proposalCounter);
    }

     function getVoter(address _voterAddress) public view returns (Voter memory) {
        if (!hasRole(VOTER_ROLE, _voterAddress)) {
            revert AddressIsNotVoter();
            }         
        return voters[_voterAddress];
    }

    function getProposal(uint256 _proposalId) external view returns (Proposal memory){
        return proposals[_proposalId];       
    }

    function isVoter(address _addr) external view returns (bool) {
        return hasRole(VOTER_ROLE, _addr);
    }

    function getVoterTokenBalance(address _addr) public view returns (uint256) {   
        return tokenContract.balanceOf(_addr);
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

        for (uint256 i = 0; i < votersArray.length; i++) {
            uint256 voterBalance = tokenContract.balanceOf(votersArray[i].voterAddress);
            if (voterBalance > 0) {
                tokenContract.burn(votersArray[i].voterAddress, voterBalance);
            }
        }

        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
        currentWorkflowStatus = WorkflowStatus.VotingSessionEnded;
    }
}
