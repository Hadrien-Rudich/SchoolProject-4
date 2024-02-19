import { useContext } from 'react';
import { ProposalsContext } from '../../../context/Proposals.context';
import ProposalModal from './ProposalModal';

function Proposal({ id, title, description }) {
  const {
    proposalModalIsOpen,
    setProposalModalIsOpen,
    selectedProposal,
    setSelectedProposal,
  } = useContext(ProposalsContext);

  const commonButtonClasses =
    'w-full text-black border self-center p-2 rounded-md transition duration-300 ease-in-out shadow-md truncate';

  const conditionalButtonClasses =
    selectedProposal === id
      ? 'bg-purple-300 border-purple-400 font-semibold'
      : 'bg-purple-200 border-purple-300 hover:bg-purple-300 hover:font-semibold';

  const toggleModal = (proposalId) => {
    if (proposalId === selectedProposal) {
      setSelectedProposal(null);
      setProposalModalIsOpen(false);
      return;
    }
    if (proposalModalIsOpen && proposalId !== selectedProposal) {
      setSelectedProposal(proposalId);
      return;
    }
    if (!proposalModalIsOpen) {
      setSelectedProposal(proposalId);
      setProposalModalIsOpen(!proposalModalIsOpen);
    }
  };

  return (
    <div className="p-5 flex justify-center items-end rounded-md">
      {proposalModalIsOpen && selectedProposal === id && (
        <ProposalModal
          id={id}
          title={title}
          description={description}
          toggleModal={toggleModal}
          // position="top-[16.6rem] left-0"
          // width="w-[144.5%]"
          width="w-full"
          position="top-0 left-0"
        />
      )}
      <button
        type="button"
        onClick={() => toggleModal(id)}
        className={`${commonButtonClasses} ${conditionalButtonClasses}`}
      >
        <p className="truncate">{title}</p>
      </button>
    </div>
  );
}

export default Proposal;
