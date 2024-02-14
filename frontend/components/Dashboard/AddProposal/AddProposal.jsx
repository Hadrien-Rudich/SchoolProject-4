import {
  useState,
  // useContext
} from 'react';
import AddProposalModal from './AddProposalModal';

function NewProposal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // const { admins } = useContext(VoteAdminsContext);
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <div className="w-full">
      {modalIsOpen ? (
        <AddProposalModal toggleModal={toggleModal} />
      ) : (
        <div className="w-full flex justify-center">
          <button
            type="submit"
            onClick={toggleModal}
            className="w-1/6 text-yellow-400 border-2 tracking-wide font-semibold self-center p-2 rounded-md border-yellow-400 hover:bg-yellow-950 hover:translate-y-1"
          >
            New Proposal
          </button>
        </div>
      )}
    </div>
  );
}

export default NewProposal;
