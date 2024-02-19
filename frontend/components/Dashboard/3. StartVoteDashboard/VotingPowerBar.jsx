/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import { VotingPowerContext } from '../../../context/VotingPower.context';
import { VotersContext } from '../../../context/Voters.context';

function VotingPowerBar() {
  const { additionalVotingPower, currentVotingPower } =
    useContext(VotingPowerContext);
  const { voter } = useContext(VotersContext);

  const currentVotingPowerWidth = `${(currentVotingPower / additionalVotingPower) * 100}%`;

  const barColor =
    currentVotingPower / additionalVotingPower > 0.7
      ? 'bg-green-500'
      : currentVotingPower / additionalVotingPower >= 0.3
        ? 'bg-yellow-500'
        : 'bg-red-500';

  console.log(voter);

  return (
    <div className="p-5 w-full flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <p className=""> Base Voting Power</p>
        <p className="text-xl text-darkPastelGreen">
          {Number(voter.baseVotingPower)}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p>Additional Voting Power</p>
        <div className="relative w-full bg-gray-300 rounded-full h-8 overflow-hidden">
          <div
            className={`h-8 rounded-full ${barColor}`}
            style={{ width: currentVotingPowerWidth }}
          />
          <p className="absolute inset-0 flex justify-center items-center text-white">
            {currentVotingPower} / {additionalVotingPower}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VotingPowerBar;
