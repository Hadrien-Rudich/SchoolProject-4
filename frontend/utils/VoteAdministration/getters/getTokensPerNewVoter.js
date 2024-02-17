import { readContract } from '@wagmi/core';
import {
  contractAddress,
  ABI,
} from '../../../constants/VoteAdministration/index';

const getTokensPerNewVoter = async () => {
  try {
    const data = await readContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'getTokensPerNewVoter',
    });
    return data;
  } catch (err) {
    if (err.code === 4001) {
      console.log('Transaction rejected by user.');
    } else {
      console.log('🔴 Error in getOneProposal: ', err.message);
    }
    throw err;
  }
};

export default getTokensPerNewVoter;
