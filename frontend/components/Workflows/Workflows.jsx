import { useContext } from 'react';
import Workflow from './Workflow';
import { WorkflowContext } from '../../context/Workflow.context';

function Workflows() {
  const { workflowStatus } = useContext(WorkflowContext);
  return (
    <div className=" flex justify-center">
      <div className="flex justify-center w-2/3 h-16 gap-2">
        {workflowStatus.map((workflow) => (
          <Workflow
            key={workflow.id}
            id={workflow.id}
            label={workflow.label}
            method={workflow.method}
          />
        ))}
      </div>
    </div>
  );
}

export default Workflows;
