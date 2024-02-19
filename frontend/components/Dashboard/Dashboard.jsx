import { useContext } from 'react';
import { useAccount } from 'wagmi';
import { WorkflowContext } from '../../context/Workflow.context';
import { VoteAdminsContext } from '../../context/VoteAdmins.context';
import VotingPowerAllocationDashboard from './1. VotingPowerAllocation/VotingPowerAllocationDashboard';
import SetUpVoteDashboard from './2. SetUpVoteDashboard/SetUpVoteDashboard';
import StartVoteDashboard from './3. StartVoteDashboard/StartVoteDashboard';
import EndVoteDashboard from './4. EndVoteDashboard/EndVoteDashboard';

function Dashboard() {
  const { address } = useAccount();
  const { currentWorkflow } = useContext(WorkflowContext);
  const { voteAdmins } = useContext(VoteAdminsContext);

  return (
    <div className=" flex justify-center h-fit ">
      <div className="flex w-2/3 bg-white gap-2 relative">
        {currentWorkflow === 1 && voteAdmins.includes(address) && (
          <div className="w-full">
            <VotingPowerAllocationDashboard />
          </div>
        )}
        {currentWorkflow === 2 && voteAdmins.includes(address) && (
          <SetUpVoteDashboard />
        )}

        {currentWorkflow === 3 && <StartVoteDashboard />}
        {currentWorkflow === 4 && <EndVoteDashboard />}
      </div>
    </div>
  );
}

export default Dashboard;
