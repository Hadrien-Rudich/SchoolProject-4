import getProposalIds from '../contracts/VoteAdministration/getters/getProposalIds';

const fetchProposalIds = async () => {
  try {
    const proposalIds = await getProposalIds();

    return proposalIds;
  } catch (error) {
    console.error('Error fetching proposals:', error);
    throw error;
  }
};

export default fetchProposalIds;
