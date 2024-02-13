import setUpVote from '../../utils/VoteAdministration/1. SetUpVote/setUpVote';

function SetUpVote() {
  const handleSetUpVote = () => {
    setUpVote();
    console.log('Set Up Vote');
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
