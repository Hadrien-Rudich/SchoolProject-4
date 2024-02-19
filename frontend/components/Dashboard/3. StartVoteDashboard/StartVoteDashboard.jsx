import { useContext } from 'react';
import { useAccount } from 'wagmi';
import Proposals from '../2. SetUpVoteDashboard/Proposals';
import VotingPowerBar from './VotingPowerBar';
import { VotersContext } from '../../../context/Voters.context';
import { VoteAdminsContext } from '../../../context/VoteAdmins.context';

function StartVoteDashboard() {
  const { address } = useAccount();
  const { voteAdmins } = useContext(VoteAdminsContext);

  const { voter } = useContext(VotersContext);
  return (
    <div className=" w-full flex  divide-x-4 divide-gray-300">
      <div className="w-full">
        <Proposals />
      </div>
      {voter && !voteAdmins.includes(address) && (
        <div className="flex w-1/3 justify-center">
          <div className="w-full">
            <VotingPowerBar />
          </div>
        </div>
      )}
    </div>
  );
}

export default StartVoteDashboard;
