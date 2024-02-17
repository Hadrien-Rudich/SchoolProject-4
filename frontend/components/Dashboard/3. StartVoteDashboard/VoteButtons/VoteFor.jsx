import React, { useContext } from 'react';
import { VotingPowerContext } from '../../../../context/VotingPower.context';
import castVote from '../../../../utils/QuadraticVoting/castVote';

function VoteFor({ id }) {
  const { fetchVotingPower } = useContext(VotingPowerContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await castVote(id, true, 6);
      fetchVotingPower();
    } catch (err) {
      console.log('🔴 Error in handleSubmit: ', err.message);
    }
  };

  return (
    <div className="w-1/3">
      <form onSubmit={handleSubmit}>
        <button
          className="w-full text-green-500 border-2 tracking-wide font-semibold self-center rounded-md border-green-500 hover:bg-green-950 hover:translate-y-1"
          type="submit"
        >
          FOR
        </button>
      </form>
    </div>
  );
}

export default VoteFor;
