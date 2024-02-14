/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';
import getAdmins from '../utils/getters/getAdmins';

export const VoteAdminsContext = createContext();

export function VoteAdminsContextProvider({ children }) {
  const [voteAdmins, setVoteAdmins] = useState([]);

  useEffect(() => {
    const fetchVoteAdmins = async () => {
      try {
        const voteAdminsArray = await getAdmins();
        setVoteAdmins(voteAdminsArray);
      } catch (err) {
        console.error('Error fetching Vote Admins:', err.message);
      }
    };

    fetchVoteAdmins();
  }, []);

  return (
    <VoteAdminsContext.Provider value={{ voteAdmins }}>
      {children}
    </VoteAdminsContext.Provider>
  );
}
