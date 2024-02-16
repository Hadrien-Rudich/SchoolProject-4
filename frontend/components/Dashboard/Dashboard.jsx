import { useContext } from 'react';
import { useAccount } from 'wagmi';
import { WorkflowContext } from '../../context/Workflow.context';
import { VoteAdminsContext } from '../../context/VoteAdmins.context';
import { VotersContext } from '../../context/Voters.context';
import SetTokens from './SetTokens';
import AddVoter from './AddVoter';
import NewProposal from './AddProposal/AddProposal';
import Proposals from './Proposals/Proposals';
import { ProposalsContext } from '../../context/Proposals.context';
import VotingPowerBar from './VotingPowerBar';

function Dashboard() {
  const { address } = useAccount();
  const { currentWorkflow } = useContext(WorkflowContext);
  const { voteAdmins } = useContext(VoteAdminsContext);
  const { proposalsArray } = useContext(ProposalsContext);
  const { voter } = useContext(VotersContext);

  return (
    <div className=" flex justify-center h-1/2 ">
      <div className="flex w-2/3 h-full bg-pink-400 gap-2 relative">
        {currentWorkflow === 1 && voteAdmins.includes(address) && <SetTokens />}
        {currentWorkflow === 2 && voteAdmins.includes(address) && (
          <div className="w-full flex divide-x-4 divide-black ">
            <div
              className={`${
                proposalsArray.length === 0 ? 'w-full ' : 'w-1/2 '
              }flex flex-col gap-2 divide-y-4 divide-black `}
            >
              <AddVoter />
              <NewProposal />
            </div>
            {proposalsArray.length > 0 && (
              <div className="w-1/2">
                <Proposals />
              </div>
            )}
          </div>
        )}
        {currentWorkflow === 3 && (
          <div className="w-full flex flex-col gap-6">
            <div>
              <Proposals />
            </div>
            <div className="w-full flex justify-center">
              {voter && (
                <div className="w-2/3">
                  <VotingPowerBar />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
