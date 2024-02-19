/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import { VotingPowerContext } from '../../../context/VotingPower.context';
import { VotersContext } from '../../../context/Voters.context';

function VotingPowerBar() {
  const { additionalVotingPower, currentVotingPower } =
    useContext(VotingPowerContext);
  const { voter } = useContext(VotersContext);

  const additionalVotingPowerBarWidth = `${(currentVotingPower / additionalVotingPower) * 100}%`;
  const baseVotingPowerBarWidth = `${Number(voter.baseVotingPower)}`;

  const barColor =
    currentVotingPower / additionalVotingPower > 0.7
      ? 'bg-green-500'
      : currentVotingPower / additionalVotingPower >= 0.3
        ? 'bg-yellow-500'
        : 'bg-red-500';

  return (
    <div className="p-5 w-full flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <p>Base Voting Power</p>

        <div className="relative w-full flex justify-center bg-black rounded-full h-8 ">
          <div
            className="flex flex-colh-8 rounded-full bg-green-500"
            style={{ width: Number(baseVotingPowerBarWidth) }}
          />
          <p className="absolute top-1 flex justify-center items-center">
            {baseVotingPowerBarWidth}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Additional Voting Power</p>

        <div className="relative w-full flex justify-center bg-black rounded-full h-8 ">
          <div
            className={`flex flex-colh-8 rounded-full ${barColor}`}
            style={{ width: additionalVotingPowerBarWidth }}
          />
          <p className="absolute top-1 flex justify-center items-center">
            {currentVotingPower} / {additionalVotingPower}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VotingPowerBar;
