import React, { useState, useContext, useEffect } from 'react';
import { VotingPowerContext } from '../../../../context/VotingPower.context';
import castVote from '../../../../utils/QuadraticVoting/castVote';

function VoteFor({ id, voteIntent, setVoteIntent }) {
  const { fetchVotingPower } = useContext(VotingPowerContext);
  const [votingPowerRequired, setVotingPowerRequired] = useState(1);

  useEffect(() => {
    setVotingPowerRequired(voteIntent ** 2);
  }, [voteIntent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await castVote(id, true, voteIntent);
      fetchVotingPower();
    } catch (err) {
      console.log('🔴 Error in handleSubmit: ', err.message);
    } finally {
      setVoteIntent(1);
    }
  };

  return (
    <form className="w-full flex justify-end" onSubmit={handleSubmit}>
      <button
        type="submit"
        className="w-1/4 text-green-500 border-2 tracking-wide font-semibold self-center rounded-md border-green-500 hover:bg-green-950 hover:translate-y-1"
      >
        FOR
      </button>
    </form>
  );
}

export default VoteFor;
