import {
  useState,
  // useContext
} from 'react';
import setTokens from '../../utils/VoteAdministration/0. VotingPowerAllocation/setTokens';
// import { VoteAdminsContext } from '../../context/VoteAdmins.context';

function SetTokens() {
  const [input, setInput] = useState(0);
  // const { admins } = useContext(VoteAdminsContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await setTokens(input);
      if (data.status === 'success') {
        setInput(0);
      }
    } catch (error) {
      console.error('Error during transaction:', error);
    }
  };

  return (
    <div className="">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-y-3 p-5 text-indigo-200"
      >
        <input
          type="text"
          value={input}
          placeholder="enter voter's address..."
          onChange={handleChange}
          className="p-2 bg-blue-100 rounded-sm placeholder-blue-500 font-semibold text-gray-900 w-2/3 my-3"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="text-green-400 border-2 tracking-wide font-semibold w-fit self-center p-2 rounded-md border-green-400 hover:bg-green-950 hover:translate-y-1"
        >
          Set Tokens
        </button>
      </form>
    </div>
  );
}

export default SetTokens;
