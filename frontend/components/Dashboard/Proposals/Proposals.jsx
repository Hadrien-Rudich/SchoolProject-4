import { useContext } from 'react';
import Proposal from './Proposal';
import { ProposalsContext } from '../../../context/Proposals.context';

function Proposals() {
  const { proposalsArray } = useContext(ProposalsContext);
  return (
    <div className="h-1/3 w-full grid grid-cols-2 gap-2">
      {proposalsArray.map((proposal) => (
        <Proposal
          key={proposal.proposalId}
          id={Number(proposal.proposalId)}
          title={proposal.title}
          description={proposal.description}
        />
      ))}
    </div>
  );
}

export default Proposals;
