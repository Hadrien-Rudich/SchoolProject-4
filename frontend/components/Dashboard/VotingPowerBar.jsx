/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import { VotingPowerContext } from '../../context/VotingPower.context';
import { VotersContext } from '../../context/Voters.context';

function VotingPowerBar() {
  const { additionalVotingPower, currentVotingPower } =
    useContext(VotingPowerContext);
  const { voter } = useContext(VotersContext);

  const barWidth = `${(currentVotingPower / additionalVotingPower) * 100}%`;

  const barColor =
    currentVotingPower / additionalVotingPower > 0.7
      ? 'bg-green-500'
      : currentVotingPower / additionalVotingPower >= 0.3
        ? 'bg-yellow-500'
        : 'bg-red-500';

  console.log(voter);
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <div className="flex flex-col gap-2">
        <p>Additional Voting Power</p>

        <div className="relative w-full flex justify-center bg-black rounded-full h-8 ">
          <div
            className={`flex flex-colh-8 rounded-full ${barColor}`}
            style={{ width: barWidth }}
          />
          <p className="absolute top-1 flex justify-center items-center">
            {currentVotingPower} / {additionalVotingPower}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p>Base Voting Power</p>
        <p className="text-xl text-green-400">
          {Number(voter.baseVotingPower)}
        </p>
      </div>
    </div>
  );
}

export default VotingPowerBar;
