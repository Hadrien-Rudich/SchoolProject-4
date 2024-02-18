import { readContract } from '@wagmi/core';
import {
  contractAddress,
  ABI,
} from '../../../constants/VoteAdministration/index';

const getProposals = async () => {
  try {
    const data = await readContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'getProposalIds',
    });
    return data;
  } catch (err) {
    if (err.code === 4001) {
      console.log('Transaction rejected by user.');
    } else {
      console.log('🔴 Error in getProposalIds: ', err.message);
    }
    throw err;
  }
};

export default getProposals;
