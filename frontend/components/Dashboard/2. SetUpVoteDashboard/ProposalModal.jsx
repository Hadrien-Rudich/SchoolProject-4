import React, { useEffect, useRef, useContext } from 'react';
import { WorkflowContext } from '../../../context/Workflow.context';
import { ProposalsContext } from '../../../context/Proposals.context';
import Input from '../../Input';
import Button from '../../Button';
import VoteButtons from '../3. StartVoteDashboard/VoteButtons/VoteButtons';

function ProposalModal() {
  const { selectedProposal, setSelectedProposal, setProposalModalIsOpen } =
    useContext(ProposalsContext);
  const { currentWorkflow } = useContext(WorkflowContext);

  const textareaRef = useRef(null);

  const handleModalClose = () => {
    setSelectedProposal({});
    setProposalModalIsOpen(false);
  };

  useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current;
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  }, [selectedProposal.description]);

  return (
    <div className={` p-5  bg-white rounded-sm`}>
      <Input
        inputText="Proposal ID"
        inputValue={Number(selectedProposal.proposalId)}
        inputWidth="w-[10%]"
        pWidth="w-1/5"
        isReadOnly
      />

      <Input
        inputText="Proposal Title"
        inputValue={selectedProposal.title}
        inputWidth="w-2/3"
        pWidth="w-1/5"
        isReadOnly
      />

      <div className="w-full flex items-center gap-4">
        <p className="w-1/5">Proposal Description</p>
        <textarea
          ref={textareaRef}
          value={selectedProposal.description}
          readOnly
          className="p-3 border w-2/3 border-slate-300 rounded-md placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black my-3 shadow-md resize-y"
        />
      </div>

      <div className="mt-10 flex">
        <div className="w-1/4 flex ">
          <Button
            handleFunction={handleModalClose}
            buttonText="Close Proposal"
            buttonColor="red"
          />
        </div>

        <div className="w-2/3 flex justify-around">
          {currentWorkflow === 3 && (
            <VoteButtons id={Number(selectedProposal.proposalId)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProposalModal;
