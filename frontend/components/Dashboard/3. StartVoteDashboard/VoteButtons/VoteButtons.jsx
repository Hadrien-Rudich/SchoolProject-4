/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import { VotingPowerContext } from '../../../../context/VotingPower.context';
import VoteAgainst from './VoteAgainst';
import VoteFor from './VoteFor';

function VoteButtons({ id }) {
  const { currentVotingPower, setVotingPowerRequired } =
    useContext(VotingPowerContext);

  const [voteIntent, setVoteIntent] = useState(1);
  useEffect(() => {
    setVotingPowerRequired(voteIntent ** 2);
  }, [voteIntent, setVotingPowerRequired]);

  const maxVotes = Math.floor(Math.sqrt(currentVotingPower));

  return (
    <div className="w-full">
      {maxVotes > 0 && (
        <div>
          <div className="">
            <label
              htmlFor="votingPowerSlider"
              className="block text-sm font-medium text-gray-700"
            />
            <div className="flex justify-center w-full">
              <input
                id="votingPowerSlider"
                type="range"
                min="1"
                max={maxVotes}
                value={voteIntent}
                onChange={(e) => setVoteIntent(Number(e.target.value))}
                className="w-1/2 h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div className="w-full flex justify-center">
              <div className="w-1/2 flex justify-between text-xs">
                <span>1 Vote</span>
                <span>{maxVotes} Votes</span>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <VoteFor
              voteIntent={voteIntent}
              setVoteIntent={setVoteIntent}
              id={id}
            />
            <VoteAgainst
              voteIntent={voteIntent}
              setVoteIntent={setVoteIntent}
              id={id}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VoteButtons;
