import { useState } from 'react';
import AddProposalModal from './AddProposalModal';
import Button from '../../Button';

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
        <div className="mt-10">
          <Button handleFunction={toggleModal} buttonText="New Proposal" />
        </div>
      )}
    </div>
  );
}

export default NewProposal;
