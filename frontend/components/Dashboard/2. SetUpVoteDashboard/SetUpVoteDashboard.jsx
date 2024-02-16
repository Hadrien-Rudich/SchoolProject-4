import { useContext } from 'react';
import AddVoter from './AddVoter';
import NewProposal from './NewProposal';
import Proposals from './Proposals';
import { ProposalsContext } from '../../../context/Proposals.context';

function SetUpVoteDashboard() {
  const { proposalsArray } = useContext(ProposalsContext);

  return (
    <div className="w-full ">
      <div className="w-full flex divide-x-4 divide-black ">
        <div
          className={`${
            proposalsArray.length === 0 ? 'w-full ' : 'w-1/2 '
          }flex flex-col gap-2 divide-y-4 divide-black`}
        >
          <div>
            <AddVoter />
          </div>
          <div className="mb-10">
            <NewProposal />
          </div>
        </div>
        {proposalsArray.length > 0 && (
          <div className="w-1/2 ">
            <Proposals />
          </div>
        )}
      </div>
    </div>
  );
}

export default SetUpVoteDashboard;
