/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';
import fetchTokensPerNewVoter from '../services/fetchTokensPerNewVoter';

export const VotingPowerContext = createContext();

export function VotingPowerContextProvider({ children }) {
  const [additionalVotingPower, setAdditionalVotingPower] = useState(0);
  const [currentVotingPower, setCurrentVotingPower] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTokensPerNewVoter();
        setAdditionalVotingPower(Number(data));
        setCurrentVotingPower(Number(data));
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <VotingPowerContext.Provider
      value={{
        additionalVotingPower,
        setAdditionalVotingPower,
        currentVotingPower,
        setCurrentVotingPower,
      }}
    >
      {children}
    </VotingPowerContext.Provider>
  );
}
