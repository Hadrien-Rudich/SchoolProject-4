import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import {
  contractAddress,
  ABI,
} from '../../../constants/VoteAdministration/index';
import { getAddress } from 'viem';

export const addVoter = async (_addr) => {
  let _ethAddress = getAddress(_addr);
  try {
    const { request } = await prepareWriteContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'addVoter',
      args: [_ethAddress],
    });

    const { hash } = await writeContract(request);
    const data = await waitForTransaction({
      hash: hash,
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
