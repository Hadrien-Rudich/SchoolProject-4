import { useContext } from 'react';
import { useAccount } from 'wagmi';
import Proposal from '../2. SetUpVoteDashboard/Proposal';
import { ProposalsContext } from '../../../context/Proposals.context';
import VoteButtons from './VoteButtons/VoteButtons';
import { VoteAdminsContext } from '../../../context/VoteAdmins.context';
import { VotersContext } from '../../../context/Voters.context';

function ProposalsToBeVoted() {
  const { address } = useAccount();
  const { voteAdmins } = useContext(VoteAdminsContext);
  const { voter } = useContext(VotersContext);

  const { proposalsArray } = useContext(ProposalsContext);
  return (
    <div className="h-1/3 w-full grid grid-cols-2 gap-2">
      {proposalsArray.map((proposal) => (
        <div key={proposal.proposalId}>
          <Proposal
            id={Number(proposal.proposalId)}
            title={proposal.title}
            description={proposal.description}
          />
          {voter && !voteAdmins.includes(address) && (
            <VoteButtons id={Number(proposal.proposalId)} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProposalsToBeVoted;
