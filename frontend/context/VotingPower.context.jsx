/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import fetchTokensPerNewVoter from '../services/fetchTokensPerNewVoter';
import fetchVoterAdditionalPower from '../services/fetchVoterAdditionalPower';

export const VotingPowerContext = createContext();

function VotingPowerUpdater({ children }) {
  const { address, isConnected } = useAccount();
  const [additionalVotingPower, setAdditionalVotingPower] = useState(0);
  const [currentVotingPower, setCurrentVotingPower] = useState(0);
  const [votingPowerRequired, setVotingPowerRequired] = useState(1);

  const fetchVotingPower = useCallback(async () => {
    if (isConnected && address) {
      try {
        const tokensPerNewVoter = await fetchTokensPerNewVoter();
        const remainingTokens = await fetchVoterAdditionalPower(address);

        setAdditionalVotingPower(Number(tokensPerNewVoter));
        setCurrentVotingPower(Number(remainingTokens));
        console.log('tokenspernewvoter', tokensPerNewVoter);
        console.log('remainingtokens', remainingTokens);
      } catch (error) {
        console.error('Error fetching voting power:', error);
      }
    }
  }, [address, isConnected]);

  useEffect(() => {
    fetchVotingPower();
  }, [fetchVotingPower]);

  return (
    <VotingPowerContext.Provider
      value={{
        additionalVotingPower,
        setAdditionalVotingPower,
        currentVotingPower,
        setCurrentVotingPower,
        fetchVotingPower,
        votingPowerRequired,
        setVotingPowerRequired,
      }}
    >
      {children}
    </VotingPowerContext.Provider>
  );
}

export function VotingPowerContextProvider({ children }) {
  return <VotingPowerUpdater>{children}</VotingPowerUpdater>;
}
