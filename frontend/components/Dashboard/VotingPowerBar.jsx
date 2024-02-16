/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import { VotingPowerContext } from '../../context/VotingPower.context';

function ProgressBar() {
  const { currentVotingPower, maxVotingPower } = useContext(VotingPowerContext);

  // Calculate width percentage of the bar
  const barWidth = `${(currentVotingPower / maxVotingPower) * 100}%`;

  const barColor =
    currentVotingPower / maxVotingPower > 0.7
      ? 'bg-green-500'
      : currentVotingPower / maxVotingPower >= 0.3
        ? 'bg-yellow-500'
        : 'bg-red-500';

  return (
    <div className="w-full space-y-2">
      <div className="w-full bg-black rounded-full h-8 ">
        <div
          className={`h-8 rounded-full ${barColor}`}
          style={{ width: barWidth }}
        />
      </div>
      <p>
        Voting Power: {currentVotingPower} / {maxVotingPower}
      </p>
    </div>
  );
}

export default ProgressBar;
