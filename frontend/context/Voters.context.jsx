/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import getVoter from '../utils/getters/getVoter';

export const VotersContext = createContext();

export function VotersContextProvider({ children }) {
  const { address } = useAccount();
  const [voter, setVoter] = useState(null);

  useEffect(() => {
    const fetchVoterDetails = async () => {
      if (!address) return;
      try {
        const voterDetails = await getVoter(address);
        setVoter(voterDetails);
      } catch (err) {
        console.error('Error fetching voter details:', err.message);
      }
    };

    fetchVoterDetails();
  }, [address]);

  return (
    <VotersContext.Provider value={{ voter }}>
      {children}
    </VotersContext.Provider>
  );
}
