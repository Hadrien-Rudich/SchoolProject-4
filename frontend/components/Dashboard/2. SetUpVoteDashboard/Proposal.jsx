import { useContext } from 'react';
import { ProposalsContext } from '../../../context/Proposals.context';

function Proposal({ proposal, toggleModal }) {
  const { selectedProposal } = useContext(ProposalsContext);

  const commonButtonClasses =
    'w-full text-black border self-center p-2 rounded-md transition duration-300 ease-in-out shadow-md truncate';

  const conditionalButtonClasses =
    selectedProposal.proposalId === proposal.proposalId
      ? 'bg-purple-300 border-purple-400 font-semibold'
      : 'bg-purple-200 border-purple-300 hover:bg-purple-300 hover:font-semibold';

  return (
    <div className="p-5 flex justify-center items-end rounded-md">
      <button
        type="button"
        onClick={() => toggleModal(proposal)}
        className={`${commonButtonClasses} ${conditionalButtonClasses}`}
      >
        <p className="truncate">{proposal.title}</p>
      </button>
    </div>
  );
}

export default Proposal;
