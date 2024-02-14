import { useContext } from 'react';
import { useAccount } from 'wagmi';
import { WorkflowContext } from '../../context/Workflow.context';
import { VoteAdminsContext } from '../../context/VoteAdmins.context';
import SetTokens from './SetTokens';
import AddVoter from './AddVoter';
import NewProposal from './AddProposal/AddProposal';

function Dashboard() {
  const { address } = useAccount();
  const { currentWorkflow } = useContext(WorkflowContext);
  const { voteAdmins } = useContext(VoteAdminsContext);
  return (
    <div className=" flex justify-center h-1/2">
      <div className="flex w-2/3 h-full bg-pink-400 gap-2">
        {currentWorkflow === 1 && voteAdmins.includes(address) && <SetTokens />}
        {currentWorkflow === 2 && voteAdmins.includes(address) && (
          <div className="w-full flex flex-col gap-10">
            <AddVoter />
            <NewProposal />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
