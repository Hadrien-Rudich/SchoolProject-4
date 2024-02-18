import { readContract } from '@wagmi/core';
import {
  contractAddress,
  ABI,
} from '../../../constants/VoteAdministration/index';

const getVoterAdditionalPower = async (_addr) => {
  try {
    const data = await readContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'getVoterTokenBalance',
      args: [_addr],
    });
    return data;
  } catch (err) {
    if (err.code === 4001) {
      console.log('Transaction rejected by user.');
    } else {
      console.log('🔴 Error in getVoterTokenBalance: ', err.message);
    }
    throw err;
  }
};

export default getVoterAdditionalPower;
