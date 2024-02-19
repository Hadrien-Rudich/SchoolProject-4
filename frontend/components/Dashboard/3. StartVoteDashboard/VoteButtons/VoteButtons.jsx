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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center w-full">
                <div className="w-full flex justify-around ">
                  <span>1 Vote</span>
                  <span>{maxVotes} Votes (max)</span>
                </div>
                <input
                  id="votingPowerSlider"
                  type="range"
                  min="1"
                  max={maxVotes}
                  value={voteIntent}
                  onChange={(e) => setVoteIntent(Number(e.target.value))}
                  className="w-2/3 h-6 bg-gray-300 rounded-md appearance-none cursor-crosshair`"
                />
              </div>
              <div className="w-full flex justify-center">
                <div className="flex w-1/2 justify-center">
                  <VoteAgainst
                    voteIntent={voteIntent}
                    setVoteIntent={setVoteIntent}
                    id={id}
                  />
                  <VoteFor
                    voteIntent={voteIntent}
                    setVoteIntent={setVoteIntent}
                    id={id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VoteButtons;
