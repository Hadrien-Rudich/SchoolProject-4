import startVote from '../../utils/VoteAdministration/2. StartVote/startVote';

function StartVote() {
  const handleStartVote = () => {
    startVote();
    console.log('Start Vote');
  };

  return (
    <div className="w-1/4">
      <button
        className="w-full h-full bg-blue-400 rounded-sm"
        type="button"
        onClick={handleStartVote}
      >
        Start Vote
      </button>
    </div>
  );
}

export default StartVote;
