import { useState } from 'react';
import AddProposalModal from './AddProposalModal';

function NewProposal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <div className="">
      {modalIsOpen ? (
        <AddProposalModal toggleModal={toggleModal} />
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              onClick={toggleModal}
              className="mt-10 w-fit text-yellow-400 border-2 tracking-wide font-semibold self-center p-2 rounded-md border-yellow-400 hover:bg-yellow-950 hover:translate-y-1"
            >
              New Proposal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewProposal;
