import getVoteSummary from '../contracts/QuadraticVoting/getVoteSummary';

const fetchVoteSummary = async (proposalId) => {
  try {
    const voteSummary = await getVoteSummary(proposalId);
    console.log(voteSummary);
    return voteSummary;
  } catch (err) {
    console.error('Error fetching Vote Summary:', err.message);
    throw err;
  }
};

export default fetchVoteSummary;
