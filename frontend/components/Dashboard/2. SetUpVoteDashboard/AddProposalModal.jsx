import { useState, useContext } from 'react';
import addProposal from '../../../contracts/VoteAdministration/1. SetUpVote/addProposal';
import fetchProposals from '../../../services/fetchProposals';
import { ProposalsContext } from '../../../context/Proposals.context';

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
    <div className="absolute top-0 w-full bg-purple-500 rounded-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-3 p-5 text-indigo-200"
      >
        <div className="w-full flex items-center gap-4">
          <p className="w-1/5 text-white">Proposal Title</p>
          <input
            type="text"
            value={inputTitle}
            placeholder="Enter a title..."
            onChange={handleTitleChange}
            className="p-2 bg-blue-100 rounded-sm placeholder-blue-300 font-semibold text-gray-900 w-2/3 my-3"
          />
        </div>
        <div className="w-full flex items-center gap-4">
          <p className="w-1/5 text-white">Proposal Description</p>
          <textarea
            value={inputDescription}
            placeholder="Enter a description..."
            onChange={handleDescriptionChange}
            className="p-2 bg-blue-100 rounded-sm placeholder-blue-300 font-semibold text-gray-900 w-2/3 my-3 h-80 resize-vertical"
          />
        </div>
        <div className="mt-10 flex">
          <div className="w-1/5" />
          <div className="w-2/3 flex justify-around">
            <button
              type="button"
              onClick={toggleModal}
              className="w-fit text-red-500 border-2 tracking-wide font-semibold self-center p-2 rounded-md border-red-500 hover:bg-red-950 hover:translate-y-1"
            >
              Close Proposal
            </button>
            <button
              type="submit"
              className="w-fit text-green-400 border-2 tracking-wide font-semibold self-center p-2 rounded-md border-green-400 hover:bg-green-950 hover:translate-y-1"
            >
              Add Proposal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProposalModal;
