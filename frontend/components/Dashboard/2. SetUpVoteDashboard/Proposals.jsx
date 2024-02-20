import { useContext } from 'react';
import Proposal from './Proposal';
import ProposalModal from './ProposalModal';
import { ProposalsContext } from '../../../context/Proposals.context';

function Proposals() {
  const {
    proposalModalIsOpen,
    proposalsArray,
    setProposalModalIsOpen,
    selectedProposal,
    setSelectedProposal,
  } = useContext(ProposalsContext);

  const toggleModal = (proposal) => {
    if (proposal.proposalId === selectedProposal.proposalId) {
      setSelectedProposal({});
      setProposalModalIsOpen(false);

      return;
    }
    if (
      proposalModalIsOpen &&
      proposal.proposalId !== selectedProposal.proposalId
    ) {
      setSelectedProposal(proposal);

      return;
    }
    if (!proposalModalIsOpen) {
      setSelectedProposal(proposal);
      setProposalModalIsOpen(!proposalModalIsOpen);
    }
  };

  return (
    <div className="flex flex-col divide-y-4 divide-gray-300">
      <div className="h-1/3 w-full grid grid-cols-2 gap-2 relative">
        {proposalsArray.map((proposal) => (
          <Proposal
            key={Number(proposal.proposalId)}
            id={Number(proposal.proposalId)}
            proposal={proposal}
            toggleModal={toggleModal}
          />
        ))}
      </div>
      {proposalModalIsOpen && <ProposalModal toggleModal={toggleModal} />}
    </div>
  );
}

export default Proposals;
