/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';
// import getAdmins from '../contracts/HomeTokenContract/getAdmins';
import fetchHomeOwnerTokenAdmins from '../services/fetchHomeOwnerTokenAdmins';

export const HomeOwnerTokenAdminsContext = createContext();

export function HomeOwnerTokenAdminsContextProvider({ children }) {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchHOTadmins = async () => {
      try {
        const adminsArray = await fetchHomeOwnerTokenAdmins();
        setAdmins(adminsArray);
      } catch (err) {
        console.error('Error fetching admins:', err.message);
      }
    };

    fetchHOTadmins();
  }, []);

  return (
    <HomeOwnerTokenAdminsContext.Provider value={{ admins }}>
      {children}
    </HomeOwnerTokenAdminsContext.Provider>
  );
}
