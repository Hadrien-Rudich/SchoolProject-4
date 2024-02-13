import { useContext } from 'react';
import endVote from '../../utils/VoteAdministration/3. EndVote/endVote';
import { WorkflowContext } from '../../context/Workflow.context';

function EndVote() {
  const { updateWorkflow } = useContext(WorkflowContext);

  const handleEndVote = async () => {
    try {
      await endVote();
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
        onClick={handleEndVote}
      >
        End Vote
      </button>
    </div>
  );
}

export default EndVote;
