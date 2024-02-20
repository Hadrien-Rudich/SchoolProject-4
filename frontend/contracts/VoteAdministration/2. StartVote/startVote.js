import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import {
  contractAddress,
  ABI,
} from '../../../constants/VoteAdministration/index';

const startVote = async () => {
  try {
    const { request } = await prepareWriteContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'startVotingSession',
    });
    const { hash } = await writeContract(request);
    const data = await waitForTransaction({
      hash,
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

export default startVote;
