import { useState, useContext } from 'react';
import setTokens from '../../utils/VoteAdministration/0. VotingPowerAllocation/setTokens';
import { VotingPowerContext } from '../../context/VotingPower.context';

function SetTokens() {
  const [input, setInput] = useState('');
  const { maxVotingPower, setMaxVotingPower } = useContext(VotingPowerContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await setTokens(input);
      setMaxVotingPower(input);
      if (data.status === 'success') {
        setInput('');
      }
    } catch (error) {
      console.error('Error during transaction:', error);
    }
  };

  return (
    <div className="w-full flex flex-col divide-y-4 divide-black ">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col  gap-y-3 p-5 text-indigo-200"
      >
        <div className="w-full flex gap-4 justify-center items-center">
          <p className=" text-white">Additional Voting Power</p>

          <input
            type="text"
            value={input}
            placeholder="0"
            onChange={handleChange}
            className="p-2 bg-blue-100 rounded-sm placeholder-blue-300 font-semibold text-gray-900 w-2/3 my-3"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-green-400 border-2 tracking-wide font-semibold w-fit self-center p-2 rounded-md border-green-400 hover:bg-green-950 hover:translate-y-1"
          >
            Set Power
          </button>
        </div>
      </form>
      <div className="h-full w-full flex items-center justify-center">
        {maxVotingPower > 0 && (
          <p className="text-2xl">
            Current Additional Voting Power: {maxVotingPower}
          </p>
        )}
      </div>
    </div>
  );
}

export default SetTokens;
