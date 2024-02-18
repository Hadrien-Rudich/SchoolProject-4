import getVoterAddresses from '../contracts/VoteAdministration/getters/getVoterAddresses';

const fetchVoterAddresses = async () => {
  try {
    const voterAddresses = await getVoterAddresses();

    return voterAddresses;
  } catch (error) {
    console.error('Error fetching voter addresses:', error);
    throw error;
  }
};

export default fetchVoterAddresses;
