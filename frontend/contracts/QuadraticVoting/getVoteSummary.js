import { readContract } from '@wagmi/core';
import { contractAddress, ABI } from '../../constants/QuadraticVoting/index';

const getVoteSummary = async (proposalId) => {
  try {
    const data = await readContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'getVoteSummary',
      args: [proposalId],
    });

    return data;
  } catch (err) {
    if (err.code === 4001) {
      console.log('Transaction rejected by user.');
    } else {
      console.error('ERROR: ', err);
    }
    throw err;
  }
};

export default getVoteSummary;
