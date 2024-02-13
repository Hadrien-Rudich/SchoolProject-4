import { useContext } from 'react';
import startVote from '../../utils/VoteAdministration/2. StartVote/startVote';
import { WorkflowContext } from '../../context/Workflow.context';

function StartVote() {
  const { updateWorkflow } = useContext(WorkflowContext);

  const handleStartVote = async () => {
    try {
      await startVote();
      await updateWorkflow();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/4">
      <button
        className="w-full h-full bg-blue-400 rounded-sm"
        type="button"
        onClick={handleStartVote}
      >
        Start Vote
      </button>
    </div>
  );
}

export default StartVote;
