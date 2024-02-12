import { createContext, useState, useEffect, useMemo } from 'react';
import { getAdmins } from '../utils/VoteAdministration/getAdmins';

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

  return useMemo(
    () => (
      <VoteAdminsContext.Provider value={{ voteAdmins }}>
        {children}
      </VoteAdminsContext.Provider>
    ),
    [voteAdmins, children]
  );
}
