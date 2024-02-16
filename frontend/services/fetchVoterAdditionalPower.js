// utils/fetchProposals.js
import getVoterAdditionalPower from '../utils/getters/getVoterAdditionalPower';

const fetchVoterAdditionalPower = async () => {
  try {
    const data = await getVoterAdditionalPower();
    return data;
  } catch (error) {
    console.error('Error fetching tokens per new voter:', error);
    throw error;
  }
};

export default fetchVoterAdditionalPower;
