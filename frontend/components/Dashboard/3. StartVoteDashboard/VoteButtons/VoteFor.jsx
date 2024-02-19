import React, { useState, useContext, useEffect } from 'react';
import { VotingPowerContext } from '../../../../context/VotingPower.context';
import castVote from '../../../../contracts/QuadraticVoting/castVote';
import Button from '../../../Button';

function VoteFor({ id, voteIntent, setVoteIntent }) {
  const { fetchVotingPower } = useContext(VotingPowerContext);
  const [, setVotingPowerRequired] = useState(1);

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
      <Button buttonText="Vote For" buttonColor="green" />
    </form>
  );
}

export default VoteFor;
