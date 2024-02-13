import endVote from '../../utils/VoteAdministration/3. EndVote/endVote';

function EndVote() {
  const handleEndVote = () => {
    endVote();
    console.log('End Vote');
  };

  return (
    <div className="w-1/4">
      <button
        className="w-full h-full bg-blue-400 rounded-sm"
        type="button"
        onClick={handleEndVote}
      >
        End Vote
      </button>
    </div>
  );
}

export default EndVote;
