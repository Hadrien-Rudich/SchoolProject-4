import { readContract } from "@wagmi/core";
import {
  contractAddress,
  ABI,
} from "../../constants/VotingAdministration/index";

export const getVoter = async () => {
  try {
    const data = await readContract({
      address: contractAddress,
      abi: ABI,
      functionName: "getVoter",
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log("🔴 Error in getVoter: ", err.message);
  }
};
