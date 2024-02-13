import {
  useState,
  // useContext
} from 'react';
import addProposal from '../../utils/VoteAdministration/1. SetUpVote/addProposal';

function AddProposal() {
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  // const { admins } = useContext(VoteAdminsContext);

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
      }
    } catch (error) {
      console.error('Error during transaction:', error);
    }
  };

  return (
    <div className="w-full">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col  gap-y-3 p-5 text-indigo-200"
      >
        <div className="w-full flex items-center gap-4">
          <p className="w-1/5 text-white">title</p>
          <input
            type="text"
            value={inputTitle}
            placeholder="Proposal title..."
            onChange={handleTitleChange}
            className="p-2 bg-blue-100 rounded-sm placeholder-blue-300 font-semibold text-gray-900 w-2/3 my-3"
          />
        </div>
        <div className="w-full flex items-center gap-4">
          <p className="w-1/5 text-white">description</p>
          <input
            type="text"
            value={inputDescription}
            placeholder="Proposal description..."
            onChange={handleDescriptionChange}
            className=" p-2 bg-blue-100 rounded-sm placeholder-blue-300 font-semibold text-gray-900 w-2/3 my-3"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-green-400 border-2 tracking-wide font-semibold w-fit self-center p-2 rounded-md border-green-400 hover:bg-green-950 hover:translate-y-1"
          >
            Add Proposl
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProposal;
