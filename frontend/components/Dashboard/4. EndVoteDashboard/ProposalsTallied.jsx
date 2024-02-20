import { useContext } from 'react';
import TallyVoteButton from './TallyVoteButton';
import Proposal from '../2. SetUpVoteDashboard/Proposal';
import ProposalModal from '../2. SetUpVoteDashboard/ProposalModal';
import { ProposalsContext } from '../../../context/Proposals.context';

function ProposalsTallied() {
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
      <div className="h-1/3 w-full grid grid-cols-2 gap-2 relative mt-4 mb-8">
        {proposalsArray.map((proposal) => (
          <div key={proposal.proposalId}>
            <Proposal
              key={Number(proposal.proposalId)}
              id={Number(proposal.proposalId)}
              proposal={proposal}
              toggleModal={toggleModal}
            />
            <TallyVoteButton id={proposal.proposalId} />
          </div>
        ))}
      </div>
      {proposalModalIsOpen && <ProposalModal toggleModal={toggleModal} />}
    </div>
  );
}

export default ProposalsTallied;
