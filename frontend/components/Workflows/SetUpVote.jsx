import { useContext } from 'react';
import setUpVote from '../../utils/VoteAdministration/1. SetUpVote/setUpVote';
import { WorkflowContext } from '../../context/Workflow.context';

function SetUpVote() {
  const { updateWorkflow } = useContext(WorkflowContext);

  const handleSetUpVote = async () => {
    try {
      await setUpVote();
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
        onClick={handleSetUpVote}
      >
        Set Up Vote
      </button>
    </div>
  );
}

export default SetUpVote;
