// utils/fetchProposals.js
import getProposals from '../utils/getters/getProposals';

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
