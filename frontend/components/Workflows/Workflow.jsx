import { useContext } from 'react';
import { WorkflowContext } from '../../context/Workflow.context';

function Workflow({ id, label, method }) {
  const { updateWorkflow } = useContext(WorkflowContext);

  const handleClick = async () => {
    try {
      if (id === 0 || id === 3) {
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
        className="w-full h-full bg-blue-400 rounded-sm"
        type="button"
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  );
}

export default Workflow;
