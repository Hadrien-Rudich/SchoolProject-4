import { useContext } from 'react';
import Proposal from './Proposal';
import { ProposalsContext } from '../../../context/Proposals.context';

function Proposals() {
  const { proposalsArray } = useContext(ProposalsContext);
  return (
    <div className="h-full flex flex-wrap justify-around">
      {proposalsArray.map((proposal) => (
        <Proposal
          key={proposal.id}
          id={proposal.id}
          title={proposal.title}
          description={proposal.description}
        />
      ))}
    </div>
  );
}

export default Proposals;
