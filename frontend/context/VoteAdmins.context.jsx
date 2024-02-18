/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import fetchVoteAdmins from '../services/fetchVoteAdmins';

export const VoteAdminsContext = createContext();

export function VoteAdminsContextProvider({ children }) {
  const { address } = useAccount();

  const [voteAdmins, setVoteAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVoteAdmins();
        setVoteAdmins(data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };
    fetchData();
  }, [setVoteAdmins, address]);

  return (
    <VoteAdminsContext.Provider value={{ voteAdmins }}>
      {children}
    </VoteAdminsContext.Provider>
  );
}
