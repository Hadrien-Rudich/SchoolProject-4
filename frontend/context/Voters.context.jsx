/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect, useContext } from 'react';
import { useAccount } from 'wagmi';
import getVoter from '../utils/VoteAdministration/getters/getVoter';
import { VoteAdminsContext } from './VoteAdmins.context';

export const VotersContext = createContext();

export function VotersContextProvider({ children }) {
  const { voteAdmins } = useContext(VoteAdminsContext);
  const { address } = useAccount();
  const [voter, setVoter] = useState(null);

  useEffect(() => {
    const fetchVoterDetails = async () => {
      if (!address) return;
      if (voteAdmins.includes(address)) return;
      try {
        const voterDetails = await getVoter(address);
        setVoter(voterDetails);
      } catch (err) {
        console.error('Error fetching voter details:', err.message);
      }
    };

    fetchVoterDetails();
  }, [setVoter, address, voteAdmins]);

  return (
    <VotersContext.Provider value={{ voter }}>
      {children}
    </VotersContext.Provider>
  );
}
