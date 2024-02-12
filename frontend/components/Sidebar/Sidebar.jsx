import AddVoter from './AddVoter';
import AddProposal from './AddProposal';
import GrantAdmin from './GrantAdmin';
import StartVote from './StartVote';
import EndVote from './EndVote';
import SetTokens from './SetTokens';
import SetUpVote from './SetUpVote';

function Sidebar() {
  return (
    <div className="w-1/6 h-1/2 flex justify-center bg-gray-200 rounded-sm">
      <div className="my-4 flex flex-col align-center gap-4 text-md">
        <SetTokens />
        <SetUpVote />
        <AddVoter />
        <AddProposal />
        <GrantAdmin />
        <StartVote />
        <EndVote />
      </div>
    </div>
  );
}

export default Sidebar;
