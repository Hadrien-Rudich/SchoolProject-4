import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import { contractAddress, ABI } from '../../constants/QuadraticVoting/index';

const castVote = async (proposalId, voteDecision, additionalVotingPower) => {
  try {
    const request = await prepareWriteContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'castVote',
      args: [proposalId, voteDecision, additionalVotingPower],
    });

    const { hash } = await writeContract(request);
    const data = await waitForTransaction({
      hash,
    });
    console.log('DATA FROM CAST VOTE: =====', data);
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

export default castVote;
