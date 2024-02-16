import { writeContract } from '@wagmi/core';
import {
  contractAddress,
  ABI,
} from '../../../constants/VoteAdministration/index';

const endVote = async () => {
  try {
    const data = await writeContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'endVotingSession',
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

export default endVote;
