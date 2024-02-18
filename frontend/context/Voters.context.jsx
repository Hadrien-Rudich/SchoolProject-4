/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect, useContext } from 'react';
import { useAccount } from 'wagmi';
import { VoteAdminsContext } from './VoteAdmins.context';
import fetchVoterDetails from '../services/fetchVoterDetails';

export const VotersContext = createContext();

export function VotersContextProvider({ children }) {
  const { voteAdmins } = useContext(VoteAdminsContext);
  const { address } = useAccount();
  const [voter, setVoter] = useState(null);

  useEffect(() => {
    const fetchVoterData = async () => {
      if (!address) return;
      if (voteAdmins.includes(address)) return;
      try {
        const voterDetails = await fetchVoterDetails(address);
        setVoter(voterDetails);
      } catch (err) {
        console.error('Error fetching voter details:', err.message);
      }
    };

    fetchVoterData();
  }, [setVoter, address, voteAdmins]);

  return (
    <VotersContext.Provider value={{ voter }}>
      {children}
    </VotersContext.Provider>
  );
}
