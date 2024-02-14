import { useContext } from 'react';
import { useAccount } from 'wagmi';
import { WorkflowContext } from '../../context/Workflow.context';
import { VoteAdminsContext } from '../../context/VoteAdmins.context';
import SetTokens from './SetTokens';
import AddVoter from './AddVoter';
import NewProposal from './AddProposal/AddProposal';
import Proposals from './Proposals/Proposals';
import { ProposalsContext } from '../../context/Proposals.context';

function Dashboard() {
  const { address } = useAccount();
  const { currentWorkflow } = useContext(WorkflowContext);
  const { voteAdmins } = useContext(VoteAdminsContext);
  const { proposalsArray } = useContext(ProposalsContext);

  return (
    <div className=" flex justify-center h-1/2">
      <div className="flex w-2/3 h-full bg-pink-400 gap-2">
        {currentWorkflow === 1 && voteAdmins.includes(address) && <SetTokens />}
        {currentWorkflow === 2 && voteAdmins.includes(address) && (
          <div className="w-full flex">
            <div
              className={`${
                proposalsArray.length === 0
                  ? 'w-full flex flex-col gap-10'
                  : 'w-1/2'
              }`}
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
      </div>
    </div>
  );
}

export default Dashboard;
