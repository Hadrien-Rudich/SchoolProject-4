import { useState } from 'react';
import fetchVoteSummary from '../../../services/fetchVoteSummary';
import Button from '../../Button';

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

  const totalVotes = voteSummary
    ? Number(voteSummary[0]) + Number(voteSummary[1])
    : 0;
  const forVotesPercentage =
    totalVotes > 0 ? (Number(voteSummary[0]) / totalVotes) * 100 : 0;
  const againstVotesPercentage =
    totalVotes > 0 ? (Number(voteSummary[1]) / totalVotes) * 100 : 0;

  // Use a gradient to visually represent the votes
  const voteGradient = `linear-gradient(to right, #68D391 ${forVotesPercentage}%, #FC8181 ${forVotesPercentage}% ${forVotesPercentage + againstVotesPercentage}%)`;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {voteSummary === null ? (
          <Button
            handleFunction={handleSubmit}
            buttonText="Tally Votes"
            buttonColor="green"
          />
        ) : (
          <div className="flex flex-col gap-3 justify-center items-center font-semibold">
            <p className="text-green-400">For: {Number(voteSummary[0])}</p>
            <p className="text-red-400">Against: {Number(voteSummary[1])}</p>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden relative">
              <div
                className="h-full rounded-full"
                style={{ background: voteGradient }}
              />
            </div>
            <p>Total: {totalVotes}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default TallyVoteButton;
