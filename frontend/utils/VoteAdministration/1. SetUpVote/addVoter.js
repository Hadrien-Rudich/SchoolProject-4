import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import { getAddress } from 'viem';
import {
  contractAddress,
  ABI,
} from '../../../constants/VoteAdministration/index';

const addVoter = async (_voterAddress, _baseVotingPower) => {
  const ethAddress = getAddress(_voterAddress);
  try {
    const { request } = await prepareWriteContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'addVoter',
      args: [ethAddress, _baseVotingPower],
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
      console.log('🔴 Error in addVoter: ', err.message);
    }
    throw err;
  }
};

export default addVoter;
