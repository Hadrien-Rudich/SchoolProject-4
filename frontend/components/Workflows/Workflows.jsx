import StartVote from './StartVote';
import EndVote from './EndVote';
import SetUpVote from './SetUpVote';
import VotingPowerAllocation from './VotingPowerAllocation';

function Workflows() {
  return (
    <div className=" flex justify-center">
      <div className="flex justify-center w-2/3 h-16 gap-2">
        <VotingPowerAllocation />
        <SetUpVote />
        <StartVote />
        <EndVote />
      </div>
    </div>
  );
}

export default Workflows;
