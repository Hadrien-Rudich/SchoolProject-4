import { writeContract } from '@wagmi/core';
import {
  contractAddress,
  ABI,
} from '../../../constants/VoteAdministration/index';

const setUpVote = async () => {
  try {
    const data = await writeContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'setUpVotingSession',
    });
    console.log(data);
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

export default setUpVote;
