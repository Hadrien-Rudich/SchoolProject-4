# Home Owner's Association Voting System

This project implements a decentralized voting system for a Home Owner's Association (HOA) using Ethereum smart contracts. It leverages the power of blockchain technology to ensure transparency, security, and integrity in the voting process. The system is composed of three main contracts: `HomeOwnerToken`, `VoteAdministration`, and `QuadraticVoting`.

## Contracts Overview

### HomeOwnerToken

An ERC20 token that represents voting power within the HOA. Tokens can be minted and burned by authorized contracts and are used to participate in voting sessions.

- **Minting/Burning**: Only contracts with the appropriate roles can mint or burn tokens.
- **Transfers**: Standard ERC20 transfer functionality, allowing token holders to transfer tokens freely.

### VoteAdministration

Manages voter registration, proposal creation, and the overall voting workflow.

- **Voter Registration**: Admins can register new voters and allocate tokens to them.
- **Proposal Management**: Admins can create and manage proposals to be voted on.
- **Workflow Status**: Controls the stages of the voting process, from proposal setup to voting session closure.

### QuadraticVoting

Implements a quadratic voting mechanism, allowing voters to cast votes on proposals with varying degrees of voting power, based on the square of the tokens they wish to commit.

- **Quadratic Voting**: Voters can cast votes on proposals, with the cost in tokens being the square of the voting power they wish to use.
- **Vote Tracking**: Records votes for and against proposals.

### Video Presentation (Pardon my French!)

https://www.loom.com/share/31459a86c013427b9de80256eaec71af?sid=7fd015d6-bcee-47e7-8657-519f13410779
