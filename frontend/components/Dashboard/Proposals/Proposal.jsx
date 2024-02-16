import { useState } from 'react';
import ProposalModal from './ProposalModal';

function Proposal({ id, title, description }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <div className="h-16 flex items-center justify-center ">
      {modalIsOpen && (
        <ProposalModal
          id={id}
          title={title}
          description={description}
          toggleModal={toggleModal}
        />
      )}
      <button
        type="submit"
        onClick={toggleModal}
        className={`${modalIsOpen ? 'text-blue-400 border-blue-400 hover:bg-blue-950' : 'text-yellow-400 border-yellow-400 hover:bg-yellow-950'} w-2/3 border-2 tracking-wide font-semibold  self-center p-1 rounded-md hover:translate-y-1 truncate `}
      >
        <p className="truncate">{title}</p>
      </button>
    </div>
  );
}

export default Proposal;
