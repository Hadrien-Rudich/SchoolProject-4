import getVoter from '../contracts/VoteAdministration/getters/getVoter';

const fetchVoterDetails = async (voterAddress) => {
  try {
    const voter = await getVoter(voterAddress);

    return voter;
  } catch (error) {
    console.error('Error fetching voter details:', error);
    throw error;
  }
};

export default fetchVoterDetails;
