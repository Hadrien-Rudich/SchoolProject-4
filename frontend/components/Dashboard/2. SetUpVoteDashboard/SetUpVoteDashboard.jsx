import { useContext, useState } from 'react';
import AddVoter from './AddVoter';
import NewProposal from './NewProposal';
import Proposals from './Proposals';
import AddProposalModal from './AddProposalModal';

import { ProposalsContext } from '../../../context/Proposals.context';

function SetUpVoteDashboard() {
  const { proposalsArray } = useContext(ProposalsContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div className="w-full ">
      <div className="w-full flex divide-x-4 divide-gray-300 ">
        <div
          className={`${
            proposalsArray.length === 0 ? 'w-full ' : 'w-1/2 '
          }flex flex-col gap-2 divide-y-4 divide-gray-300`}
        >
          <div>
            <AddVoter />
          </div>
          <div className="mb-10">
            {modalIsOpen ? (
              <div className="">
                <NewProposal
                  toggleModal={toggleModal}
                  modalIsOpen={modalIsOpen}
                />
              </div>
            ) : (
              <div className="">
                <AddProposalModal
                  toggleModal={toggleModal}
                  modalIsOpen={modalIsOpen}
                />
              </div>
            )}
          </div>
        </div>
        {proposalsArray.length > 0 && (
          <div className="w-1/2 ">
            <Proposals />
          </div>
        )}
      </div>
    </div>
  );
}

export default SetUpVoteDashboard;
