import getAdmins from '../contracts/HomeTokenContract/getAdmins';

const fetchHomeOwnerTokenAdmins = async () => {
  try {
    const proposalIds = await getAdmins();

    return proposalIds;
  } catch (error) {
    console.error('Error fetching HOT admins:', error);
    throw error;
  }
};

export default fetchHomeOwnerTokenAdmins;
