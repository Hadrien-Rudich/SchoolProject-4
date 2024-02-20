import { useState, useContext } from 'react';
import addProposal from '../../../contracts/VoteAdministration/1. SetUpVote/addProposal';
import fetchProposals from '../../../services/fetchProposals';
import { ProposalsContext } from '../../../context/Proposals.context';
import Input from '../../Input';
import Button from '../../Button';

function AddProposalModal({ toggleModal }) {
  const { setProposalsArray } = useContext(ProposalsContext);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setInputDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addProposal(inputTitle, inputDescription);
      if (data.status === 'success') {
        setInputTitle('');
        setInputDescription('');
        toggleModal();
        const fetchedProposals = await fetchProposals();
        setProposalsArray(fetchedProposals);
      }
    } catch (error) {
      console.error('Error during transaction:', error);
    }
  };

  return (
    <div className="w-full bg-white rounded-md">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col p-5 text-black rounded-md"
      >
        <Input
          inputText="Proposal title"
          inputValue={inputTitle}
          placeHolderText="Enter a title..."
          onChange={handleTitleChange}
          inputWidth="w-2/3"
          pWidth="w-1/5"
        />

        <div className="w-full flex items-center gap-4 ">
          <p className="w-1/5">Proposal Description</p>
          <textarea
            value={inputDescription}
            placeholder="Enter a description..."
            onChange={handleDescriptionChange}
            className={`h-80 w-2/3  p-3 bg-white border border-slate-300 rounded-md 
             placeholder-slate-400 focus:outline-none 
            focus:ring-1 focus:ring-black resize-vertical my-3 shadow-md`}
          />
        </div>
        <div className="mt-10 flex">
          <div className="w-1/5" />
          <div className="w-2/3 flex justify-around">
            <Button
              handleFunction={toggleModal}
              buttonText="Close Proposal"
              buttonColor="red"
            />
            <Button
              handleFunction={handleSubmit}
              buttonText="Add Proposal"
              buttonColor="green"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProposalModal;
