import { useContext } from 'react';
import Proposal from '../2. SetUpVoteDashboard/Proposal';
import TallyVoteButton from './TallyVoteButton';
import { ProposalsContext } from '../../../context/Proposals.context';

function ProposalsToBeVoted() {
  const { proposalsArray } = useContext(ProposalsContext);
  return (
    <div className="p-5 h-full w-full grid grid-cols-2 gap-2">
      {proposalsArray.map((proposal) => (
        <div key={proposal.proposalId}>
          <Proposal
            id={Number(proposal.proposalId)}
            title={proposal.title}
            description={proposal.description}
          />
          <TallyVoteButton id={proposal.proposalId} />
        </div>
      ))}
    </div>
  );
}

export default ProposalsToBeVoted;
