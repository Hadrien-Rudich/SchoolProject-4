import getAdmins from '../contracts/VoteAdministration/getters/getAdmins';

const fetchVoteAdmins = async () => {
  try {
    const voteAdminsArray = await getAdmins();
    return voteAdminsArray;
  } catch (err) {
    console.error('Error fetching Vote Admins:', err.message);
    throw err;
  }
};

export default fetchVoteAdmins;
