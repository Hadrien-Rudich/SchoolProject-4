import { toast } from 'react-toastify';
import { useContext } from 'react';
import { WorkflowContext } from '../../context/Workflow.context';

function Workflow({ id, label, method }) {
  const { updateWorkflow, workflowStatus, currentWorkflow } =
    useContext(WorkflowContext);

  const handleClick = async () => {
    try {
      if (id === 0 || id === 4) {
        return;
      }
      const data = await method();
      if (data.status === 'success') {
        await updateWorkflow();
        toast.success(
          `Voting Session Updated:
          [${workflowStatus[currentWorkflow - 1].label}] --->
          [${workflowStatus[currentWorkflow].label}]`,
          {
            position: 'top-right',
          }
        );
      }
    } catch (error) {
      toast.error('Voting Session Update Failed', {
        position: 'top-right',
      });
      console.log(error);
    }
  };

  const isDisabled = id !== currentWorkflow || id === 0 || id === 4;

  return (
    <div className="w-1/4">
      <button
        className={`${
          id < currentWorkflow
            ? `bg-darkPastelGreen w-full h-full text-white rounded-md shadow-lg transition duration-300 font-semibold tracking-widest`
            : `bg-gray-500 w-full h-full text-white rounded-md shadow-lg transition duration-300 font-semibold tracking-widest ${
                !isDisabled ? 'hover:bg-darkPastelGreen ease-in-out' : ''
              }`
        }`}
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
      >
        {label}
      </button>
    </div>
  );
}

export default Workflow;
