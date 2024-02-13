import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import {
  contractAddress,
  ABI,
} from '../../../constants/VoteAdministration/index';

const setTokens = async (_tokensPerNewVoter) => {
  try {
    const { request } = await prepareWriteContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'setTokensPerNewVoter',
      args: [_tokensPerNewVoter],
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

export default setTokens;
