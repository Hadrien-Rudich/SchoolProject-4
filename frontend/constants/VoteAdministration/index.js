export const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';

export const ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenContractAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_initialAdmin',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AccessControlBadConfirmation',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'neededRole',
        type: 'bytes32',
      },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AddressAlreadyAdmin',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AddressAlreadyVoter',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AddressIsNotVoter',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CannotAddProposalsOutsideOfVotingSetUp',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CannotAddVotersOutsideOfVotingSetUp',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CannotSetTokensOutsideOfVotingPowerAllocationWindow',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ContractLacksMinterRole',
    type: 'error',
  },
  {
    inputs: [],
    name: 'VotingSessionCannotBeEnded',
    type: 'error',
  },
  {
    inputs: [],
    name: 'VotingSessionCannotBeStarted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'VotingSetUpCannotBeStarted',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
      },
    ],
    name: 'ProposalRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'voterAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'voterId',
        type: 'uint256',
      },
    ],
    name: 'VoterRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum VoteAdministration.WorkflowStatus',
        name: 'previousStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum VoteAdministration.WorkflowStatus',
        name: 'newStatus',
        type: 'uint8',
      },
    ],
    name: 'WorkflowStatusChange',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'VOTER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
    ],
    name: 'addProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_voterAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_baseVotingPower',
        type: 'uint256',
      },
    ],
    name: 'addVoter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentWorkflowStatus',
    outputs: [
      {
        internalType: 'enum VoteAdministration.WorkflowStatus',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'endVotingSession',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAdmins',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_proposalId',
        type: 'uint256',
      },
    ],
    name: 'getProposal',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'voteCount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'votingIsClosed',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isAccepted',
            type: 'bool',
          },
        ],
        internalType: 'struct VoteAdministration.Proposal',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getProposals',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'voteCount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'votingIsClosed',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isAccepted',
            type: 'bool',
          },
        ],
        internalType: 'struct VoteAdministration.Proposal[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTokensPerNewVoter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_voterAddress',
        type: 'address',
      },
    ],
    name: 'getVoter',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'voterId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'baseVotingPower',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'voterAddress',
            type: 'address',
          },
        ],
        internalType: 'struct VoteAdministration.Voter',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_addr',
        type: 'address',
      },
    ],
    name: 'getVoterTokenBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_adminAddress',
        type: 'address',
      },
    ],
    name: 'grantAdminRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_addr',
        type: 'address',
      },
    ],
    name: 'isVoter',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proposalCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'proposals',
    outputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'voteCount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'votingIsClosed',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'isAccepted',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'callerConfirmation',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokensPerNewVoter',
        type: 'uint256',
      },
    ],
    name: 'setTokensPerNewVoter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'setUpVotingSession',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startVotingSession',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenContract',
    outputs: [
      {
        internalType: 'contract HomeOwnerToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'voterCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'voters',
    outputs: [
      {
        internalType: 'uint256',
        name: 'voterId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'baseVotingPower',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'voterAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
