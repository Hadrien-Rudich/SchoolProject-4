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

  const isDisabled = id !== currentWorkflow || id === 0 || id === 4;

  return (
    <div className="w-1/4">
      <button
        className={`${
          id < currentWorkflow
            ? `bg-darkPastelGreen w-full h-full text-white rounded-sm shadow-lg transition duration-300 tracking-widest font-bold ${
                !isDisabled ? 'hover:bg-darkerPastelGreen ease-in-out' : ''
              }`
            : `bg-gray-500 w-full h-full text-white  rounded-sm shadow-lg transition duration-300 tracking-widest font-bold ${
                !isDisabled ? 'hover:bg-gray-600 ease-in-out' : ''
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
