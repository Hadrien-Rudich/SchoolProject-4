import React, { useState, useContext, useEffect } from 'react';
import { VotingPowerContext } from '../../../../context/VotingPower.context';
import castVote from '../../../../utils/QuadraticVoting/castVote';

function VoteAgainst({ id, voteIntent, setVoteIntent }) {
  const { fetchVotingPower } = useContext(VotingPowerContext);
  const [votingPowerRequired, setVotingPowerRequired] = useState(1);

  useEffect(() => {
    setVotingPowerRequired(voteIntent ** 2);
  }, [voteIntent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await castVote(id, false, voteIntent);
      fetchVotingPower();
    } catch (err) {
      console.log('🔴 Error in handleSubmit: ', err.message);
    } finally {
      setVoteIntent(1); // Reset vote intent after submission
    }
  };

  return (
    <form className="w-full flex justify-start" onSubmit={handleSubmit}>
      <button
        type="submit"
        className="w-1/4 text-red-500 border-2 tracking-wide font-semibold self-center rounded-md border-red-500 hover:bg-red-950 hover:translate-y-1"
      >
        AGAINST
      </button>
    </form>
  );
}

export default VoteAgainst;
