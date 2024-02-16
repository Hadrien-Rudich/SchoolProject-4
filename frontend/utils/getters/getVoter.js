import { readContract } from '@wagmi/core';
import { contractAddress, ABI } from '../../constants/VoteAdministration/index';

const getVoter = async (_voterAddress) => {
  try {
    const data = await readContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'getVoter',
      args: [_voterAddress],
    });
    return data;
  } catch (err) {
    console.log('🔴 Error in getVoter: ', err.message);
    throw err;
  }
};

export default getVoter;
