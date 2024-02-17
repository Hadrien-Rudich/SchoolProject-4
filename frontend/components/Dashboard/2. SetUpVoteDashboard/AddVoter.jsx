import {
  useState,
  // useContext
} from 'react';
import addVoter from '../../../utils/VoteAdministration/1. SetUpVote/addVoter';

function AddVoter() {
  const [inputAddress, setInputAddress] = useState('');
  const [inputBaseVotingPower, setInputBaseVotingPower] = useState('');

  // const { admins } = useContext(VoteAdminsContext);

  const handleAddressChange = (e) => {
    setInputAddress(e.target.value);
  };

  const handleBaseVotingPowerChange = (e) => {
    setInputBaseVotingPower(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addVoter(inputAddress, inputBaseVotingPower);
      if (data.status === 'success') {
        setInputAddress('');
        setInputBaseVotingPower('');
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
          <p className="w-1/5 text-white">New Voter Address</p>
          <input
            type="text"
            value={inputAddress}
            placeholder="0x000000...."
            onChange={handleAddressChange}
            className="p-2 bg-blue-100 rounded-sm placeholder-blue-300 font-semibold text-gray-900 w-2/3 my-3"
          />
        </div>
        <div className="w-full flex items-center gap-4">
          <p className="w-1/5 text-white">Base Voting Power</p>
          <input
            type="text"
            value={inputBaseVotingPower}
            placeholder="0"
            onChange={handleBaseVotingPowerChange}
            className=" p-2 bg-blue-100 rounded-sm placeholder-blue-300 font-semibold text-gray-900 w-1/5 my-3"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-fit text-green-400 border-2 tracking-wide font-semibold  self-center p-2 rounded-md border-green-400 hover:bg-green-950 hover:translate-y-1"
          >
            Add Voter
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVoter;
