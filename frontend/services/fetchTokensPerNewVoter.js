// utils/fetchProposals.js
import getTokensPerNewVoter from '../utils/VoteAdministration/getters/getTokensPerNewVoter';

const fetchTokensPerNewVoter = async () => {
  try {
    const data = await getTokensPerNewVoter();
    return data;
  } catch (error) {
    console.error('Error fetching tokens per new voter:', error);
    throw error;
  }
};

export default fetchTokensPerNewVoter;
