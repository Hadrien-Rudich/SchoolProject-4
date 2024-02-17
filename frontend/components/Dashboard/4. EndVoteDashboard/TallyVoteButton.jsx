import { useState } from 'react';
import fetchVoteSummary from '../../../services/fetchVoteSummary';

function TallyVoteButton({ id }) {
  const [voteSummary, setVoteSummary] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const summary = await fetchVoteSummary(id);
      setVoteSummary(summary);
    } catch (error) {
      console.error('Error fetching vote summary:', error);
    }
  };
  return (
    <div>
      <form action="submit">
        {voteSummary === null ? (
          <button type="submit" onClick={handleSubmit}>
            Tally Votes
          </button>
        ) : (
          <div>
            <p className="text-green-400">For: {Number(voteSummary[0])}</p>
            <p className="text-red-400">Against: {Number(voteSummary[1])}</p>
            <p>Total Votes: {Number(voteSummary[0] + voteSummary[1])}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default TallyVoteButton;
