/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';

export const VotingPowerContext = createContext();

export function VotingPowerContextProvider({ children }) {
  const [maxVotingPower, setMaxVotingPower] = useState(0);
  const [currentVotingPower, setCurrentVotingPower] = useState(0);

  return (
    <VotingPowerContext.Provider
      value={{
        maxVotingPower,
        setMaxVotingPower,
        currentVotingPower,
        setCurrentVotingPower,
      }}
    >
      {children}
    </VotingPowerContext.Provider>
  );
}
