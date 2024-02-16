import { useContext } from 'react';
import ProposalsToBeVoted from './ProposalsToBeVoted';
import VotingPowerBar from './VotingPowerBar';
import { VotersContext } from '../../../context/Voters.context';

function StartVoteDashboard() {
  const { voter } = useContext(VotersContext);
  return (
    <div className="w-full flex flex-col gap-6 divide-y-4 divide-black">
      <div>
        <ProposalsToBeVoted />
      </div>
      <div className="w-full flex justify-center">
        {voter && (
          <div className=" my-10 w-2/3">
            <VotingPowerBar />
          </div>
        )}
      </div>
    </div>
  );
}

export default StartVoteDashboard;
