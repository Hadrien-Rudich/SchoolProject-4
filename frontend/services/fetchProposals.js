import getProposals from '../utils/VoteAdministration/getters/getProposals';

const fetchProposals = async () => {
  try {
    const data = await getProposals();
    return data;
  } catch (error) {
    console.error('Error fetching proposals:', error);
    throw error;
  }
};

export default fetchProposals;
