import { readContract } from '@wagmi/core';
import { contractAddress, ABI } from '../../constants/HomeOwnerToken/index';

const getAdmins = async () => {
  try {
    const data = await readContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'getAdmins',
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log('🔴 Error in getAdmins: ', err.message);
    throw err;
  }
};

export default getAdmins;
