import getVoterAdditionalPower from '../contracts/VoteAdministration/getters/getVoterAdditionalPower';

const fetchVoterAdditionalPower = async (voterAddress) => {
  try {
    const data = await getVoterAdditionalPower(voterAddress);
    return data;
  } catch (error) {
    console.error('Error fetching tokens per new voter:', error);
    throw error;
  }
};

export default fetchVoterAdditionalPower;
