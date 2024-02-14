import { useContext } from 'react';
import { WorkflowContext } from '../../context/Workflow.context';

function Workflow({ id, label, method }) {
  const { updateWorkflow, currentWorkflow } = useContext(WorkflowContext);

  const handleClick = async () => {
    try {
      if (id === 0 || id === 4) {
        return;
      }
      await method();
      await updateWorkflow();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/4">
      <button
        // className="w-full h-full bg-gray-400 rounded-sm"
        className={`${
          id < currentWorkflow
            ? 'bg-green-400 w-full h-full rounded-sm'
            : 'bg-gray-400 w-full h-full rounded-sm'
        }`}
        type="button"
        onClick={handleClick}
        disabled={id !== currentWorkflow || id === 0 || id === 4}
      >
        {label}
      </button>
    </div>
  );
}

export default Workflow;
