import { toast } from 'react-toastify';
import React, { useState, useContext, useEffect } from 'react';
import { VotingPowerContext } from '../../../../context/VotingPower.context';
import castVote from '../../../../contracts/QuadraticVoting/castVote';
import Button from '../../../Button';

function VoteAgainst({ id, voteIntent, setVoteIntent }) {
  const { fetchVotingPower } = useContext(VotingPowerContext);
  const [, setVotingPowerRequired] = useState(1);

  useEffect(() => {
    setVotingPowerRequired(voteIntent ** 2);
  }, [voteIntent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await castVote(id, false, voteIntent);
      if (data.status === 'success') {
        toast.success(`Vote Cast: AGAINST Proposal ID: ${id}`, {
          position: 'top-right',
        });
        fetchVotingPower();
      }
    } catch (err) {
      toast.error('Vote Cast Failed', {
        position: 'top-right',
      });
      console.log('🔴 Error in handleSubmit: ', err.message);
    } finally {
      setVoteIntent(1);
    }
  };

  return (
    <form className="w-full flex justify-end" onSubmit={handleSubmit}>
      <Button buttonText="Vote Against" buttonColor="red" />
    </form>
  );
}

export default VoteAgainst;
